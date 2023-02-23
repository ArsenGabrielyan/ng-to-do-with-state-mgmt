import { ValidationMessagePipe } from './validation-message.pipe';

describe('ValidationMessagePipe', () => {
  it('create an instance', () => {
    const pipe = new ValidationMessagePipe();
    expect(pipe).toBeTruthy();
  });
});
