import { Checkbox, Slider } from "@mui/material"
import React, { useEffect, useState } from "react"
import { FaRegCopy } from "react-icons/fa"
import { AiOutlineArrowRight } from "react-icons/ai"

function App() {
  const [strMed, setStrMed] = useState<number[]>([])
  const [strLabels, setStrLabels] = useState<string[]>([
    "MUITO FRACA",
    "FRACA",
    "MÉDIA",
    "FORTE",
  ])
  const [passLen, setPassLen] = useState<number | number[]>(13)
  const [generatedPass, setGeneratedPass] = useState<string>("")
  const [copied, setCopied] = useState<boolean>(false)

  const handleCheck = (id: number) => {
    strMed.indexOf(id) === -1
      ? setStrMed([...strMed, id])
      : setStrMed(strMed.filter((item) => item !== id))
  }

  const handleSlider = (e: Event, newValue: number | number[]) => {
    setPassLen(newValue)
  }

  const sortUppercase = () => {
    const alphabet: string[] = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
    ]

    const min = Math.ceil(0)
    const max = Math.floor(alphabet.length)
    let rndNum = Math.floor(Math.random() * (max - min) + min)

    return alphabet[rndNum]
  }

  const sortNumber = () => {
    const min = Math.ceil(0)
    const max = 10
    let rndNum = Math.floor(Math.random() * (max - min) + min)
    return rndNum
  }

  const sortSymbol = () => {
    const symbols: string[] = ["!", "@", "$", "#", "%", "&"]

    const min = Math.ceil(0)
    const max = Math.floor(symbols.length)
    let rndNum = Math.floor(Math.random() * (max - min) + min)
    return symbols[rndNum]
  }

  const generatePass = () => {
    if (strMed.length === 0) return
    setGeneratedPass(() => "")
    let num: number
    const min = Math.ceil(0)
    const max = Math.floor(strMed.length)
    let rndNum
    for (let i: number = 0; i < passLen; i++) {
      rndNum = Math.floor(Math.random() * (max - min) + min)

      num = strMed[rndNum]
      switch (num) {
        case 0:
          setGeneratedPass((value) => value + sortUppercase())
          break
        case 1:
          setGeneratedPass((value) => value + sortUppercase().toLowerCase())
          break
        case 2:
          setGeneratedPass((value) => value + sortNumber())
          break
        case 3:
          setGeneratedPass((value) => value + sortSymbol())
          break
      }
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [copied])

  return (
    <div className="App">
      <div className="container-main">
        <h2 className="title">Gerador de Senhas</h2>
        <div className="pass-section">
          <h1 className="pass-text">{generatedPass}</h1>
          <div className="icon-copy">
            <FaRegCopy
              style={{ fontSize: "30px", color: "#A4FFAF" }}
              onClick={() => {
                navigator.clipboard.writeText(generatedPass)
                setCopied(true)
              }}
            />
            {copied && <p className="copied">Copiado!</p>}
          </div>
        </div>
        <div className="generator-section">
          <div className="char-length">
            <p>Tamanho</p>
            <h2>{passLen}</h2>
          </div>
          <Slider
            aria-label="Large"
            min={6}
            max={20}
            value={passLen}
            sx={{ color: "#A4FFAF" }}
            onChange={handleSlider}
          />
          <div className="checks">
            <div className="single-check">
              <Checkbox
                sx={{
                  color: "#fff",
                  "& .MuiSvgIcon-root": { fontSize: 28 },
                  "&.Mui-checked": {
                    color: "#A4FFAF",
                  },
                }}
                onChange={() => handleCheck(0)}
              />

              <p>Incluir Letras Maiúsculas</p>
            </div>
            <div className="single-check">
              <Checkbox
                sx={{
                  color: "#fff",
                  "& .MuiSvgIcon-root": { fontSize: 28 },
                  "&.Mui-checked": {
                    color: "#A4FFAF",
                  },
                }}
                onChange={() => handleCheck(1)}
              />
              <p>Incluir Letras Minúsculas</p>
            </div>
            <div className="single-check">
              <Checkbox
                sx={{
                  color: "#fff",
                  "& .MuiSvgIcon-root": { fontSize: 28 },
                  "&.Mui-checked": {
                    color: "#A4FFAF",
                  },
                }}
                onChange={() => handleCheck(2)}
              />
              <p>Incluir Números</p>
            </div>
            <div className="single-check">
              <Checkbox
                sx={{
                  color: "#fff",
                  "& .MuiSvgIcon-root": { fontSize: 28 },
                  "&.Mui-checked": {
                    color: "#A4FFAF",
                  },
                }}
                onChange={() => handleCheck(3)}
              />
              <p>Incluir Simbolos</p>
            </div>
          </div>
          <div className="strengt-container">
            <h3 className="title">FORÇA</h3>
            <div className="str-force">
              <h2>{strLabels[strMed?.length - 1]}</h2>
              <div className="str-boxes">
                {strLabels.map((item, index) => {
                  let changeClass = ""
                  if (index < strMed.length) changeClass = "box-checked"
                  return (
                    <div key={index} className={`box ${changeClass}`}></div>
                  )
                })}
              </div>
            </div>
          </div>
          <button
            className={strMed.length > 0 ? "button" : "button-disabled"}
            onClick={() => generatePass()}
          >
            GERAR <AiOutlineArrowRight style={{ fontWeight: "bold" }} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
