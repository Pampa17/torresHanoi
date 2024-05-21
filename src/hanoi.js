// * Función para resolver la torre de hanoi y obtener la secuencia de movimientos

const getHanoiSolutions = (nDiscs) => {
    const solutions = [];

    // * Función recursiva para mover la torre de discos desde el origen al destino. Usando aux como un auxiliar peg

    const hanoi = (n, origin, destiny, aux) => {
        if (n == 1) {
            //* Caso base: Si solo hay un disco, mueve directamente al destino
            solutions.push({
                disc: n,
                origin,
                destiny,
            });
            return;
        }
        //* Mover n - 1 discos desde el origen al aux. usando destiny como un auxiliar peg

        hanoi(n - 1, origin, aux, destiny);

        //* Mover el n-esimo disco desde el origen al destino
        solutions.push({ disc: n, origin, destiny });

        //* Mover n - 1  discos desde aux hacia el destiny, usando origen como un auxiliar peg

        hanoi(n - 1, aux, destiny, origin);
    };
    //* Empezar el proceso recursivo con la llamada inicial a la función de hanoi
    hanoi(nDiscs, 0, 1, 2);

    return solutions;
};

export { getHanoiSolutions };
