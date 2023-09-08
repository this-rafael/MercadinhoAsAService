import { Test, TestingModule } from '@nestjs/testing';
import {
  BadGatewayException,
  BadRequestException,
  INestApplication,
} from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

type Matchers = {
  [key: string]: (e: any) => any;
};

class CatchThat {
  private defaultCallback: (e: any) => any | void = (e: any) => {
    throw e;
  };

  constructor(private readonly matchers: Matchers) {}

  static on(matchers: Matchers) {
    return new CatchThat(matchers);
  }

  asDefault(callback: (e: any) => any) {
    this.defaultCallback = callback;
    return this;
  }

  catch(e: any) {
    const callback = this.matchers[e.constructor.name] || this.defaultCallback;
    return callback(e);
  }
}

function testfunc() {
  // rand int 0 - 150
  const rand = Math.floor(Math.random() * 150);
  if (rand < 50) {
    throw new TypeError('Error');
  } else if (rand < 100) {
    throw new BadGatewayException('Error');
  } else {
    throw new BadRequestException('Error');
  }
}

function abc() {
  try {
    const test = testfunc();
  } catch (e) {
    CatchThat.on({
      TypeError: (e) => {
        console.log('TypeError + e' + e);
      },
      Error: (e) => {
        console.log('Error + e' + e);
      },
      BadRequestException: (e) => {
        console.log('BadRequestException + e' + e);
      },
    })
      .asDefault((e) => {
        console.log('Default + e' + e);
      })
      .catch(e);
  }
}

describe('AppController (e2e)', () => {
  it('/ (GET)', () => {
    while (true) {
      abc();
    }
    expect(1).toBe(1);
  });
});
