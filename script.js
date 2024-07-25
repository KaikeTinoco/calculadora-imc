document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('formulario');

    formulario.addEventListener('submit', function(event) {
        resetarMensagemErro();

        if (!validarCamposObrigatorios()) {
            event.preventDefault();
        }

        function validarCamposObrigatorios(){
            let camposObrigatorios = document.querySelectorAll('.obrigatorio');
            
            let camposValidos = true;

            for (let i = 0; i < camposObrigatorios.length; i++) {
                let campo = camposObrigatorios[i];
                if (campo.value === '' || campo.value === null) {
                    mostrarErro(campo, 'esse campo é obrigatorio')
                    camposValidos = false;
                }

            }
            return camposValidos;
        }

        function mostrarErro(elemento, mensagem){
            let mensagemErro = elemento.parentElement.querySelector('.mensagemErro');
            mensagemErro.textContent = mensagem;
            mensagemErro.style.display = 'inline-block'
        }

        function resetarMensagemErro(){
            let mensagemErro = document.querySelectorAll('.mensagemErro')
            for (let i = 0; i < mensagemErro.length; i++) {
                mensagemErro[i].textContent = ''; 
            }
        }

        let peso = document.getElementById('Peso');
        let altura = document.getElementById('Altura');
        let imc = Number(calcularIMC(peso.value, Number(altura.value)))

        function calcularIMC(peso, altura) {
            let imc = (peso / (altura * altura)).toFixed(2)
           return imc;
        }

        function avaliarIMC(imc){
            switch(true) {
                case imc < 16:
                    return 'Magreza grave';
                case imc >= 16 && imc < 17:
                    return 'Magreza moderada';
                case imc >= 17 && imc < 18.5:
                    return 'Magreza leve';
                case imc >= 18.5 && imc < 25:
                    return 'Saudável';
                case imc >= 25 && imc < 30:
                    return 'Sobrepeso';
                case imc > 30 && imc < 35:
                    return 'Obesidade grau 1';
                case imc > 35 && imc < 40:
                    return 'Obesidade grau 2';
                case imc > 40:
                    return 'Obesidade grau 3';
            }
        }

        let resultadoImc = avaliarIMC(imc);
        let nome = document.getElementById('Nome').value;
        function adcionarResultados(imc, resultadoImc, nome){
            let textoResultado = document.getElementById('resultado')
            let textoClassificado = document.getElementById('classificacao')

            textoResultado.textContent = `${nome}, seu imc é: ${imc}`;
            textoClassificado.textContent = `e voce está com ${resultadoImc}`
        }

        adcionarResultados(imc, resultadoImc, nome);
        event.preventDefault();
    })

})