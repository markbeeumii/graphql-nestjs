import { ValueTransformer } from 'typeorm';
import { Hash } from '../../utils/bcryptService';

export class PasswordTransformer implements ValueTransformer {
  /**
   * Transform to custom value
   * @param value value to transform
   */
  to(value) {
    return Hash.make(value);
  }

  /**
   * Original value
   * @param value to be transformed
   */
  from(value) {
    return value;
  }
}
