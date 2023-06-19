import { User } from '../entities/user.js';

import { UserModel } from './user.mongo.model.js';
import { UserRepo } from './user.mongo.repository.js';

jest.mock('./user.mongo.model.js');



describe('Given UserRepo Class', () => {
  describe('When I instantiate it', () => {
    const repo = new UserRepo();

    test('Then method create should be used', async () => {
      const mockUser = { author: 'Marco' } as unknown as User;
      UserModel.create = jest.fn().mockResolvedValue(mockUser);
      const result = await repo.create(mockUser);
      expect(UserModel.create).toHaveBeenCalled();
      expect(result).toEqual(mockUser);
    });
  test('Then the method delete should be called', async () => {
    const mockId = '6';
    const exec = jest.fn();
   UserModel.findByIdAndDelete = jest.fn().mockReturnValueOnce({
      exec,
    });
    await repo.delete(mockId);
    expect(UserModel.findByIdAndDelete).toHaveBeenCalled();
    expect(exec).toHaveBeenCalled();
  });

  test('Then it should throw an error when the delete method doesn`t find a valid id', async () => {
    const mockId = '9';
    const exec = jest.fn().mockResolvedValue(null);
   UserModel.findByIdAndDelete = jest.fn().mockReturnValueOnce({
      exec,
    });
    await expect(repo.delete(mockId)).rejects.toThrow();
  });


  });
}
)
