const {validarReserva, haySolapamiento} = require ('../src/horario');

describe ('Validacion de horarios y reservas', () => {
    test ("deberia permitir una reserva valida dentro del rango", () => {
        expect (validarReserva(8, 10)).toBe(undefined);
    });

    test ("deberia rechazar una reserva en mas de 4 hrs", () => {
        expect (()=> validarReserva(8, 13)).toThrow("Horario Inválido");
    });
    
    test ("deberia rechazar una reserva fuera del horario de atencion (antes de las 7)", () => {
        expect (()=> validarReserva(5, 8)).toThrow('Horario Inválido');
    });

    test ("Deberia rechazar si la hr de fin es menor o igual al incio", () => {
        expect (()=> validarReserva(10, 10)).toThrow('Horario Inválido');
    });

    test ("Deberia detectar choque si 2 reservas se superponen", () => {
        const existentes = [{inicio: 8, fin: 11 }];
        const resultado = haySolapamiento({inicio: 10, fin: 12}, existentes[0]);
        expect (resultado).toBe (true);
    });

    test ("deberia permitir reserrvas sin coinsiderar choque (10-12)(8-10)", () => {
        const existentes = [{inicio: 8, fin: 10 }];
        const resultado = haySolapamiento({inicio: 10, fin: 8}, existentes);
        expect (resultado).toBe (false);
    });
}); 
