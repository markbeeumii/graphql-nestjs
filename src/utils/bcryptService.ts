import * as bcrypt from 'bcrypt';

export class Hash {
  static make(plainText:string|any) {
    const salt = bcrypt.genSaltSync(12, 'b');
    return bcrypt.hashSync(plainText, salt);
  }

  static compare(plainText:any, hash:any) {
    return bcrypt.compareSync(plainText, hash);
  }
}
