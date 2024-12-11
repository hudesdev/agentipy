const path = require("path");
const { generateIdl } = require("@metaplex-foundation/shank-js");

const idlDir = path.join(__dirname, "..", "idls");
const binaryInstallDir = path.join(__dirname, "..", ".crates");
const programDir = path.join(__dirname, "..", "programs");

generateIdl({
  generator: "anchor",
  programName: "pump_science",
  programId: "4HNtUwX2P8z275jK3R6x7KoFqPx3bQWjXxhWtAFCiuvW",
  idlDir,
  binaryInstallDir,
  programDir: path.join(programDir, "pump-science"),
  rustbin: { locked: true },
});
