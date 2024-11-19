const path = require("path");
const { generateIdl } = require("@metaplex-foundation/shank-js");

const idlDir = path.join(__dirname, "..", "idls");
const binaryInstallDir = path.join(__dirname, "..", ".crates");
const programDir = path.join(__dirname, "..", "programs");

generateIdl({
  generator: "anchor",
  programName: "pump_science",
  programId: "EtZR9gh25YUM6LkL2o2yYV1KzyuDdftHvYk3wsb2Ypkj",
  idlDir,
  binaryInstallDir,
  programDir: path.join(programDir, "pump-science"),
  rustbin: { locked: true },
});
