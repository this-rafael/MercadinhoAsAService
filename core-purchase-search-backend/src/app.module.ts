import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import {
//   AppService,
//   Calculadora,
//   Dividir,
//   Multiplicar,
//   Not,
//   Somar,
//   Subtrair,
//   UnaryOperation,
// } from './app.service';
// import { Injects } from 'strategy_nest';
//
// @Module({
//   controllers: [AppController],
//   imports: [],
//   providers: [
//     ...Injects.ofMany([Somar, Subtrair, Multiplicar, Dividir], Calculadora),
//     Injects.of(UnaryOperation, Not),
//     AppService,
//   ],
// })
export class AppModule {}
