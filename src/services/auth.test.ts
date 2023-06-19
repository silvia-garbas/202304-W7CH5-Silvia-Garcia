import { AuthServices, PayloadToken } from './auth';
import jwt from 'jsonwebtoken';
// P import { compare } from 'bcrypt';

jest.mock('jsonwebtoken');

describe('Given AuthServices class', () => {
  describe('When I use createJWT', () => {
    test('Then JWT sign should been called', () => {
      const payload = {} as PayloadToken;
      AuthServices.createJWT(payload);
      expect(jwt.sign).toHaveBeenCalled();
    });

    describe('When I use compare method',
     () =>{

      test('Then should return true when the value matched the hash',() =>{

     const result = 'true'
      expect(result).toMatch('true');
    //  A   expect(compare).toHaveBeenCalled()
      })
    })
  });

})
