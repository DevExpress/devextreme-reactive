/* eslint no-bitwise: ["error", { "allow": ["<<", ">>", "&"] }] */

export default function (seed = 123456789) {
  let mW = seed;
  let mZ = 987654321;
  const mask = 0xffffffff;

  return () => {
    mZ = ((36969 * (mZ & 65535)) + (mZ >> 16)) & mask;
    mW = ((18000 * (mW & 65535)) + (mW >> 16)) & mask;
    let result = ((mZ << 16) + mW) & mask;
    result /= 4294967296;
    return result + 0.5;
  };
}
