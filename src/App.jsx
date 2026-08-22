import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// Estilos extraídos e adaptados a partir da estrutura do seu VS Code
const certStyles = {
  container: {
    padding: '20px',
    backgroundColor: '#ffffff',
    fontFamily: 'sans-serif',
    width: '900px',
    margin: '0 auto',
    boxSizing: 'border-box'
  },
  certificadoFrente: {
    border: '3px solid #1e3a8a',
    padding: '10px',
    boxSizing: 'border-box'
  },
  certificadoFrenteMolduraInterna: {
    border: '1px solid #cbd5e1',
    padding: '30px 20px',
    textAlign: 'center',
    boxSizing: 'border-box'
  },
  localData: { 
    fontSize: '14px', 
    fontWeight: 'bold', 
    margin: '10px 0',
    color: '#000000'
  },
  linhaAssinatura: { 
    display: 'flex', 
    justifyContent: 'space-around', 
    width: '100%', 
    marginTop: '10px' 
  },
  assinatura: { 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    fontSize: '12px',
    color: '#000000'
  },
  tracoAssinatura: { 
    width: '200px', 
    borderTop: '1px solid #000000', 
    marginBottom: '4px' 
  },
  tituloVerso: { 
    fontSize: '20px', 
    color: '#1e3a8a', 
    margin: '10px 0',
    textAlign: 'center'
  },
  tabelaVerso: { 
    width: '90%', 
    borderCollapse: 'collapse', 
    marginTop: '20px',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  thVerso: { 
    border: '1px solid #000000', 
    padding: '8px', 
    backgroundColor: '#f1f5f9', 
    fontSize: '12px',
    color: '#000000',
    fontWeight: 'bold'
  },
  tdVerso: { 
    border: '1px solid #000000', 
    padding: '8px', 
    fontSize: '12px', 
    textAlign: 'center',
    color: '#000000'
  }
};

export default function App() {
  const certRef = useRef(null);

  // Função para gerar o PDF em alta definição
  const baixarCertificado = async () => {
    const element = certRef.current;
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });

      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save('Certificado_KESIA_MARIA.pdf');
    } catch (error) {
      console.error('Erro ao gerar o PDF:', error);
    }
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f3f4f6', minHeight: '100vh' }}>
      
      {/* Botão de Download */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <button 
          onClick={baixarCertificado}
          style={{
            padding: '12px 24px',
            backgroundColor: '#1e3a8a',
            color: '#ffffff',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}
        >
          Baixar Certificado em PDF
        </button>
      </div>

      {/* Conteúdo do Certificado (Ref capturada pelo HTML2Canvas) */}
      <div ref={certRef} style={certStyles.container}>
        
        {/* FRENTE DO CERTIFICADO */}
        <div style={certStyles.certificadoFrente}>
          <div style={certStyles.certificadoFrenteMolduraInterna}>
            
            <h1 style={{ fontSize: '26px', color: '#1e3a8a', letterSpacing: '1px', marginBottom: '10px' }}>
              MAZZ CURSOS & CAPACITAÇÕES
            </h1>

            <h3 style={{ color: '#c2410c', textTransform: 'uppercase', fontSize: '18px', marginBottom: '25px' }}>
              CERTIFICADO DE CONCLUSÃO
            </h3>

            <p style={{ fontSize: '13px', color: '#475569', marginBottom: '15px' }}>
              Certificamos para os devidos fins que o(a) aluno(a):
            </p>

            <h2 style={{ fontSize: '28px', color: '#000000', margin: '15px 0', textTransform: 'uppercase', fontWeight: 'bold' }}>
              KESIA MARIA
            </h2>

            <p style={{ fontSize: '13px', color: '#000000', marginBottom: '20px' }}>
              portador(a) do CPF <strong>03426457229</strong>
            </p>

            <p style={{ fontSize: '13px', color: '#475569', marginBottom: '15px' }}>
              concluiu com êxito o curso de capacitação profissional em:
            </p>

            <h3 style={{ fontSize: '22px', color: '#1e3a8a', textTransform: 'uppercase', marginBottom: '25px' }}>
              DESENVOLVIMENTO DE APIS RESTFUL
            </h3>

            {/* Caixinha com Notas/Status */}
            <div style={{
              display: 'inline-block',
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              padding: '8px 20px',
              borderRadius: '6px',
              fontSize: '12px',
              marginBottom: '25px',
              color: '#000000'
            }}>
              CARGA HORÁRIA: <strong>40h</strong> &nbsp;&nbsp;|&nbsp;&nbsp; 
              NOTA OBTIDA: <strong>10 / 10.0</strong> &nbsp;&nbsp;|&nbsp;&nbsp; 
              SITUAÇÃO: <strong style={{ color: '#16a34a' }}>APROVADO</strong>
            </div>

            <div style={certStyles.localData}>
              CUIABÁ - MT, 21 de agosto de 2026
            </div>

            <br /><br />

            {/* Linha de Assinaturas */}
            <div style={certStyles.linhaAssinatura}>
              {/* Lado Esquerdo - Direção Geral Atualizada */}
              <div style={certStyles.assinatura}>
                <div style={certStyles.tracoAssinatura}></div>
                <div>Direção Geral</div>
                <strong>MAZZ CURSOS</strong>
                <span style={{ fontSize: '10px', color: '#475569' }}>CNPJ: 68.664.946/0001-96</span>
              </div>

              {/* Lado Direito - Data de Emissão */}
              <div style={certStyles.assinatura}>
                <div style={certStyles.tracoAssinatura}></div>
                <div>Data de Emissão</div>
                <strong>21 de agosto de 2026</strong>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}