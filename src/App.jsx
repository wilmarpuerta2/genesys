import { useEffect } from "react";
import "./App.css";

function App() {
  useEffect(() => {
    // Aquí insertamos literalmente tu script original como texto
    const inlineScript = document.createElement("script");
    inlineScript.type = "text/javascript";
    inlineScript.charset = "utf-8";

    inlineScript.text = `
      (function (g, e, n, es, ys) {
          g['_genesysJs'] = e;
          g[e] = g[e] || function () {
            (g[e].q = g[e].q || []).push(arguments);
          };
          g[e].t = 1 * new Date();
          g[e].c = es;
          ys = document.createElement('script');
          ys.async = 1;
          ys.src = n;
          ys.charset = 'utf-8';
          document.head.appendChild(ys);
      })(window, 'Genesys', 'https://apps.sae1.pure.cloud/genesys-bootstrap/genesys.min.js', {
          environment: 'prod-sae1',
          deploymentId: 'b417cc0e-fd1e-4867-8dc4-51ee0f79550f'
      });
    `;

    // Insertarlo en el head
    document.head.appendChild(inlineScript);
  }, []);

  return (
    <div className="container-fluid">
      <div className="container-image">
        <img
          src="https://api-cdn.sae1.pure.cloud/response-assets/v2/uploads/88cd0b6e-0f75-4ed4-850b-3315e94fc9b5/59502f0a-dbb7-4511-b3cf-a28bf45fb788.73eb1ade-16f9-48e2-8890-1986c6b64a0c.png"
          alt="Asistencia interna"
        />
      </div>

      <div className="container-body">
        <h3>Asistencia interna Sistecrédito</h3>
        <p>
          Bienvenido al chat para asistencia interna de Sistecrédito.
          Para iniciar, presiona el icono en la parte inferior.
        </p>
      </div>
    </div>
  );
}

export default App;