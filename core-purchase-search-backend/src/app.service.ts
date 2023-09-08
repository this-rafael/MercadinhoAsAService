import { Injectable } from '@nestjs/common';

export abstract class Somar {
  abstract somar(a: number, b: number): number;
}

export abstract class Subtrair {
  abstract subtrair(a: number, b: number): number;
}

export abstract class Multiplicar {
  abstract multiplicar(a: number, b: number): number;
}

export abstract class Dividir {
  abstract dividir(a: number, b: number): number;
}

export abstract class UnaryOperation {
  abstract not(a: any): boolean;
}

@Injectable()
export class Not implements UnaryOperation {
  not(a: any): boolean {
    return !a;
  }
}

@Injectable()
export class Calculadora implements Somar, Subtrair, Multiplicar, Dividir {
  static counter = 0;

  constructor() {
    Calculadora.counter++;
    console.log(`Calculadora ${Calculadora.counter} criada!`);
  }

  somar(a: number, b: number): number {
    console.log(`Calculadora ${Calculadora.counter} somando!`);
    return a + b;
  }

  subtrair(a: number, b: number): number {
    console.log(`Calculadora ${Calculadora.counter} subtraindo!`);
    return a - b;
  }

  multiplicar(a: number, b: number): number {
    console.log(`Calculadora ${Calculadora.counter} multiplicando!`);
    return a * b;
  }

  dividir(a: number, b: number): number {
    console.log(`Calculadora ${Calculadora.counter} dividindo!`);
    return a / b;
  }
}

@Injectable()
export class AppService {
  constructor(
    private readonly soma: Somar,
    private readonly subtracao: Subtrair,
    private readonly multiplicacao: Multiplicar,
    private readonly divisao: Dividir,
    private readonly not: UnaryOperation,
  ) {}

  getHello(): string {
    console.log(this.soma.somar(1, 2));
    console.log(this.subtracao.subtrair(1, 2));
    console.log(this.multiplicacao.multiplicar(1, 2));
    console.log(this.divisao.dividir(1, 2));
    console.log(this.not.not(true));
    return 'Hello World!';
  }
}
