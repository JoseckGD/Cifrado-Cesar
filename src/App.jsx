import React, { useRef, useState } from "react";
import "./App.css";

const App = () => {
  const [text, setText] = useState(
    "PETER LEGRAND IS A GOOD FRIEND OF NAPOLEON"
  );
  const [password, setPassword] = useState("LOUPL");
  const [cipherText, setCipherText] = useState("");
  const [decipheredText, setDecipheredText] = useState("");
  const [cipherTable, setCipherTable] = useState([]);
  const [decipheredTextTable, setDecipheredTextTable] = useState("");

  const alfabeto = "abcdefghijklmnñopqrstuvwxyz";
  const inputArchivo = useRef(null);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleCipher = () => {
    const table = [];
    let result = "";
    const text_ = text.replace(/\s/g, "");

    // Asegurarse de que la contraseña sea válida
    const validPassword = password.toLowerCase();

    if (!/^[a-zñ]+$/.test(validPassword)) {
      alert("La contraseña debe contener solo letras del alfabeto español.");
      return;
    }

    // Construir la tabla de cifrado
    for (let i = 0; i < text_.length; i++) {
      const char = text_.charAt(i).toLowerCase();
      const charIndex = alfabeto.indexOf(char);
      let cipheredChar;
      let cipheredCharIndex = -1;
      let passwordChar = "";
      let passwordCharIndex = -1;

      if (charIndex !== -1) {
        const passwordIndex = i % validPassword.length;
        passwordChar = validPassword.charAt(passwordIndex);
        passwordCharIndex = alfabeto.indexOf(passwordChar);

        cipheredCharIndex = (charIndex + passwordCharIndex) % alfabeto.length;
        cipheredChar = alfabeto.charAt(cipheredCharIndex);
      } else {
        // Caracteres no válidos se mantienen igual
        cipheredChar = char;
      }

      table.push({
        index: i + 1,
        charIndex: charIndex !== -1 ? charIndex : "",
        char: text_.charAt(i),
        passwordCharIndex: passwordCharIndex !== -1 ? passwordCharIndex : "",
        passwordChar: passwordChar,
        processCipheredChard: `(${charIndex} + ${passwordCharIndex}) % ${alfabeto.length}`,
        cipheredCharIndex: cipheredCharIndex !== -1 ? cipheredCharIndex : "",
        cipheredChar,
      });
      result += cipheredChar;
    }

    setCipherText(result);
    setCipherTable(table);
  };

  const handleDecipher = () => {
    const table = [];
    let result = "";

    for (let i = 0; i < cipherText.length; i++) {
      const char = cipherText.charAt(i).toLowerCase();
      const charIndex = alfabeto.indexOf(char);
      let decipheredChar;
      let passwordChar = "";
      let passwordCharIndex = -1;
      let decipheredCharIndex = -1;

      if (charIndex !== -1) {
        const passwordIndex = i % password.length;
        passwordChar = password.toLowerCase().charAt(passwordIndex);
        passwordCharIndex = alfabeto.indexOf(passwordChar);

        decipheredCharIndex =
          (charIndex - passwordCharIndex + alfabeto.length) % alfabeto.length;
        decipheredChar = alfabeto.charAt(decipheredCharIndex);
      } else {
        // Caracteres no válidos se mantienen igual
        decipheredChar = char;
      }

      table.push({
        index: i + 1,
        cipherTextIndex: charIndex !== -1 ? charIndex : "",
        cipherText: cipherText.charAt(i),
        passwordCharIndex: passwordCharIndex !== -1 ? passwordCharIndex : "",
        passwordChar: passwordChar,
        processDecipheredChard: `(${charIndex} - ${passwordCharIndex} + ${alfabeto.length}) % ${alfabeto.length}`,
        decipheredCharIndex:
          decipheredCharIndex !== -1 ? decipheredCharIndex : "",
        decipheredChar: decipheredChar,
      });

      result += decipheredChar;
    }

    setDecipheredText(result);
    setDecipheredTextTable(table);
  };

  const handleReset = () => {
    setText("");
    setPassword("");
    setCipherText("");
    setDecipheredText("");
    setCipherTable([]);
    setDecipheredTextTable([]);
    if (inputArchivo.current) {
      inputArchivo.current.value = ""; // Borrar el valor actual del campo de entrada de tipo "file"
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file && file.type.includes("text/plain")) {
      const reader = new FileReader();
      reader.onload = handleFileRead;
      reader.readAsText(file);
    }
  };

  const handleFileRead = (event) => {
    const content = event.target.result;
    // console.log(content);
    setText(content);
  };

  return (
    <>
      <h1>Cifrado César</h1>

      <section className="container inputs">
        <div className="input-container">
          <label htmlFor="text-file" className="input-label">
            Archivo de Texto:
          </label>
          <input
            type="file"
            id="text-file"
            onChange={handleFileChange}
            ref={inputArchivo}
          />
        </div>

        <div className="input-container">
          <label htmlFor="text" className="input-label">
            Texto a codificar:
          </label>
          <input
            type="text"
            id="text"
            value={text}
            onChange={handleTextChange}
          />
        </div>

        <div className="input-container">
          <label htmlFor="password" className="input-label">
            Contraseña:
          </label>
          <input
            type="text"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
      </section>

      <section className="container">
        <button className="button" onClick={handleCipher}>
          Codificar
        </button>

        <button className="button-reiniciar" onClick={handleReset}>
          Reiniciar
        </button>
      </section>

      <section className="container">
        <table>
          <thead>
            <tr>
              <th colSpan="100%">Alfabeto</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {alfabeto.split("").map((letra, index) => (
                <td key={index}>{index}</td>
              ))}
            </tr>

            <tr>
              {alfabeto.split("").map((letra, index) => (
                <td key={index}>{letra}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </section>

      {cipherTable.length !== 0 && (
        <section className="container table">
          <table>
            <thead>
              <tr>
                <th colSpan="100%">Procedimiento</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Indice Letra</td>
                {cipherTable.map((row) => (
                  <td key={row.index}>{row.charIndex}</td>
                ))}
              </tr>

              <tr>
                <td>Letra</td>
                {cipherTable.map((row) => (
                  <td key={row.index}>{row.char}</td>
                ))}
              </tr>

              <tr>
                <td colSpan="100%">&nbsp;</td>
              </tr>

              <tr>
                <td>Indice Contraseña</td>
                {cipherTable.map((row) => (
                  <td key={row.index}>{row.passwordCharIndex}</td>
                ))}
              </tr>

              <tr>
                <td>Contraseña</td>
                {cipherTable.map((row) => (
                  <td key={row.index}>{row.passwordChar}</td>
                ))}
              </tr>

              <tr>
                <td colSpan="100%">&nbsp;</td>
              </tr>

              <tr>
                <td>Calculo</td>
                {cipherTable.map((row) => (
                  <td key={row.index}>{row.processCipheredChard}</td>
                ))}
              </tr>

              <tr>
                <td colSpan="100%">&nbsp;</td>
              </tr>

              <tr>
                <td>Indice (%)</td>
                {cipherTable.map((row) => (
                  <td key={row.index}>{row.cipheredCharIndex}</td>
                ))}
              </tr>

              <tr>
                <td>Codificada</td>
                {cipherTable.map((row) => (
                  <td key={row.index}>{row.cipheredChar}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </section>
      )}

      {cipherTable.length !== 0 && (
        <h3 className="result-text">Texto codificado: {cipherText}</h3>
      )}

      {cipherTable.length !== 0 && (
        <section className="container">
          <button onClick={handleDecipher}>Decodificar</button>
        </section>
      )}

      {decipheredTextTable.length !== 0 && (
        <section className="container">
          <table>
            <thead>
              <tr>
                <th colSpan="100%">Procedimiento</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Indice Letra Codificada</td>
                {decipheredTextTable.map((row) => (
                  <td key={row.index}>{row.cipherTextIndex}</td>
                ))}
              </tr>

              <tr>
                <td>Codificada</td>
                {decipheredTextTable.map((row) => (
                  <td key={row.index}>{row.cipherText}</td>
                ))}
              </tr>

              <tr>
                <td colSpan="100%">&nbsp;</td>
              </tr>

              <tr>
                <td>Indice Contraseña</td>
                {decipheredTextTable.map((row) => (
                  <td key={row.index}>{row.passwordCharIndex}</td>
                ))}
              </tr>

              <tr>
                <td>Contraseña</td>
                {decipheredTextTable.map((row) => (
                  <td key={row.index}>{row.passwordChar}</td>
                ))}
              </tr>

              <tr>
                <td colSpan="100%">&nbsp;</td>
              </tr>

              <tr>
                <td>Calculo</td>
                {decipheredTextTable.map((row) => (
                  <td key={row.index}>{row.processDecipheredChard}</td>
                ))}
              </tr>

              <tr>
                <td colSpan="100%">&nbsp;</td>
              </tr>

              <tr>
                <td>Indice Decodificada (%)</td>
                {decipheredTextTable.map((row) => (
                  <td key={row.index}>{row.decipheredCharIndex}</td>
                ))}
              </tr>

              <tr>
                <td>Decodificada</td>
                {decipheredTextTable.map((row) => (
                  <td key={row.index}>{row.decipheredChar}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </section>
      )}

      {decipheredText.length !== 0 && (
        <h3 className="result-text">Texto decodificado: {decipheredText}</h3>
      )}
    </>
  );
};

export default App;
