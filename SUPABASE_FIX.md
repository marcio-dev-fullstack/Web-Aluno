# Corrigir relacionamento no Supabase

Se a interface acusa que não foi possível encontrar um relacionamento entre `alunos_matriculados` e `matriculas`, você pode corrigir criando a foreign key/relationship no banco.

Opções:

1) Pelo painel do Supabase (GUI)
- Acesse seu projeto no Supabase
- Vá em `Table editor` -> selecione a tabela `matriculas`
- Adicione uma coluna `aluno_id` que referencia `alunos_matriculados.id` (tipo integer/uuid conforme seu esquema)
- No painel `Relationships` ou `Foreign keys`, adicione uma foreign key apontando `aluno_id -> alunos_matriculados.id`.
- Depois, recarregue a API (pode levar alguns segundos para o cache do PostgREST atualizar).

2) Por SQL (exemplo genérico, adapte tipos):

```sql
-- Exemplo: cria coluna e foreign key (adapte os tipos conforme o seu esquema)
ALTER TABLE public.matriculas
  ADD COLUMN IF NOT EXISTS aluno_id bigint;

ALTER TABLE public.matriculas
  ADD CONSTRAINT fk_matriculas_aluno
  FOREIGN KEY (aluno_id) REFERENCES public.alunos_matriculados(id);
```

3) Se sua tabela de ligação se chama `matriculas_cursos`, ajuste o código do frontend para usar essa relação. Exemplo de select relacional:

```js
// Se a relação no Supabase se chamar 'matriculas_cursos'
const { data } = await supabase.from('alunos_matriculados').select('*, matriculas_cursos(curso_id)');
```

Após aplicar a alteração no banco, volte à aplicação e clique em `Recarregar dados` no painel admin.

4) Alternativa temporária sem tocar no banco

- Você pode definir uma variável de ambiente para o frontend com o nome da relação que deseja usar, sem alterar o código novamente.
- Crie/abra o arquivo `.env.local` na raiz do projeto e adicione:

```
VITE_MATRICULAS_REL=matriculas_cursos
```

- Reinicie o servidor de desenvolvimento (`npm run dev -- --force`) e o frontend tentará usar esse nome prioritariamente.

---

SQL pronto para `matriculas_cursos`

Se sua tabela de vínculo se chama `matriculas_cursos`, você pode executar o seguinte SQL no SQL Editor do Supabase (ou colar o arquivo `sql/create_matriculas_fks.sql` que foi adicionado ao repositório):

```sql
-- Cria colunas e foreign keys para tabela de ligação de matrículas
-- Adapte os tipos (bigint/uuid) conforme seu esquema antes de executar.

BEGIN;

ALTER TABLE IF EXISTS public.matriculas_cursos
  ADD COLUMN IF NOT EXISTS aluno_id bigint;

ALTER TABLE IF EXISTS public.matriculas_cursos
  ADD COLUMN IF NOT EXISTS curso_id bigint;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints tc
    JOIN information_schema.key_column_usage kcu ON tc.constraint_name = kcu.constraint_name
    WHERE tc.constraint_type = 'FOREIGN KEY' AND tc.table_name = 'matriculas_cursos' AND kcu.column_name = 'aluno_id'
  ) THEN
    ALTER TABLE public.matriculas_cursos
      ADD CONSTRAINT fk_matriculas_cursos_aluno
      FOREIGN KEY (aluno_id) REFERENCES public.alunos_matriculados(id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints tc
    JOIN information_schema.key_column_usage kcu ON tc.constraint_name = kcu.constraint_name
    WHERE tc.constraint_type = 'FOREIGN KEY' AND tc.table_name = 'matriculas_cursos' AND kcu.column_name = 'curso_id'
  ) THEN
    ALTER TABLE public.matriculas_cursos
      ADD CONSTRAINT fk_matriculas_cursos_curso
      FOREIGN KEY (curso_id) REFERENCES public.cursos(id);
  END IF;
END$$;

COMMIT;
```

Após executar, aguarde alguns segundos e recarregue o painel admin na aplicação e clique em `Recarregar dados`.
