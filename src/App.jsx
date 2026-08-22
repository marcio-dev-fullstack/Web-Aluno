import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// Estilos extraídos do seu projeto
const certStyles = {
  container: {
    padding: '20px',
    backgroundColor: '#ffffff',
    fontFamily: 'serif',
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
    border: '1px solid #c2410c',
    padding: '30px 20px',
    textAlign: 'center',
    boxSizing: 'border-box'
  },
  localData: { 
    fontSize: '14px', 
    fontWeight: 'bold', 
    margin: '15px 0',
    color: '#000000'
  },
  linhaAssinatura: { 
    display: 'flex', 
    justifyContent: 'space-around', 
    width: '100%', 
    marginTop: '20px' 
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
  }
};

export default function App() {
  const certRef = useRef(null);

  // Função para gerar e baixar o PDF
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

      {/* Conteúdo do Certificado */}
      <div ref={certRef} style={certStyles.container}>
        
        {/* FRENTE DO CERTIFICADO */}
        <div style={certStyles.certificadoFrente}>
          <div style={certStyles.certificadoFrenteMolduraInterna}>
            
            {/* Cabeçalho principal com CNPJ */}
            <h1 style={{ fontSize: '26px', color: '#1e3a8a', letterSpacing: '1px', marginBottom: '2px', fontWeight: 'bold' }}>
              MAZZ CURSOS & CAPACITAÇÕES
            </h1>
            <div style={{ fontSize: '11px', color: '#334155', fontWeight: 'bold', marginBottom: '20px' }}>
              CNPJ: 68.664.946/0001-96
            </div>

            <h3 style={{ color: '#c2410c', textTransform: 'uppercase', fontSize: '18px', marginBottom: '25px', fontWeight: 'bold' }}>
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

            <h3 style={{ fontSize: '22px', color: '#1e3a8a', textTransform: 'uppercase', marginBottom: '25px', fontWeight: 'bold' }}>
              BUSINESS INTELLIGENCE COM POWER BI
            </h3>

            {/* Quadro de Status e Notas */}
            <div style={{
              display: 'inline-block',
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              padding: '8px 20px',
              borderRadius: '6px',
              fontSize: '12px',
              marginBottom: '20px',
              color: '#000000'
            }}>
              CARGA HORÁRIA: <strong>40h</strong> &nbsp;&nbsp;|&nbsp;&nbsp; 
              NOTA OBTIDA: <strong>10 / 10.0</strong> &nbsp;&nbsp;|&nbsp;&nbsp; 
              SITUAÇÃO: <strong style={{ color: '#16a34a' }}>APROVADO</strong>
            </div>

            <div style={certStyles.localData}>
              CUIABÁ - MT, 22 de agosto de 2026
            </div>

            <br />

            {/* Rodapé com Linhas de Assinatura e Emissão */}
            <div style={certStyles.linhaAssinatura}>
              <div style={certStyles.assinatura}>
                <div style={certStyles.tracoAssinatura}></div>
                <div>Direção Pedagogica</div>
                <strong>MAZZ T.I e Capacitação</strong>
              </div>

              <div style={certStyles.assinatura}>
                <div style={certStyles.tracoAssinatura}></div>
                <div>Data de Emissão</div>
                <strong>22 de agosto de 2026</strong>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}