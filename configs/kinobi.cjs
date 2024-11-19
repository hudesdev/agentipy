const path = require("path");
const k = require("@metaplex-foundation/kinobi");
const fs = require("fs");
// Paths.
const clientDir = path.join(__dirname, "..", "clients");
const idlDir = path.join(__dirname, "..", "idls");

// Instanciate Kinobi.
const kinobi = k.createFromIdls([
  path.join(idlDir, "pump_science.json"),
]);

kinobi.update(
  new k.updateProgramsVisitor({
    pumpScience: { name: "pumpScience", prefix: "ps" },
  })
);

const MINT_NODE_DESC = "The mint of the bonding curve tkn";

// Update accounts.
kinobi.update(
  new k.updateAccountsVisitor({
    platformVault: {
      seeds: [
        k.constantPdaSeedNodeFromString("platform-vault"),
        k.variablePdaSeedNode("mint", k.publicKeyTypeNode(), MINT_NODE_DESC),
      ],
    },
    creatorVault: {
      seeds: [
        k.constantPdaSeedNodeFromString("creator-vault"),
        k.variablePdaSeedNode("mint", k.publicKeyTypeNode(), MINT_NODE_DESC),
      ],
    },
    global: {
      seeds: [k.constantPdaSeedNodeFromString("global")],
    },
    bondingCurve: {
      seeds: [
        k.constantPdaSeedNodeFromString("bonding-curve"),
        k.variablePdaSeedNode("mint", k.publicKeyTypeNode(), MINT_NODE_DESC),
      ],
    },
    brandVault: {
      seeds: [
        k.constantPdaSeedNodeFromString("brand-vault"),
        k.variablePdaSeedNode("mint", k.publicKeyTypeNode(), MINT_NODE_DESC),
      ],
    },
    presaleVault: {
      seeds: [
        k.constantPdaSeedNodeFromString("presale-vault"),
        k.variablePdaSeedNode("mint", k.publicKeyTypeNode(), MINT_NODE_DESC),
      ],
    },
    eventAuthority: {
      seeds: [k.constantPdaSeedNodeFromString("__event_authority")],
    },
  }),
  new k.setStructDefaultValuesVisitor({
    allocationData: {
      dev: 10.0,
      cex: 10.0,
      launchBrandkit: 10.0,
      lifetimeBrandkit: 10.0,
      platform: 10.0,
      presale: 0,
      poolReserve: 50.0,
    },
  })
);

// Render JavaScript.
const jsDir = path.join(clientDir, "js", "src", "generated");
const prettier = require(path.join(clientDir, "js", ".prettierrc.json"));
kinobi.accept(
  new k.renderJavaScriptVisitor(jsDir, {
    prettierOptions: prettier,
    exportAccounts: true,
  })
);

// cp idls dir in clients/js/src/idls
const idlsTargetDir = path.join(clientDir, "js", "src", "idls");
fs.cpSync(idlDir, idlsTargetDir, { recursive: true });
// cp target/types in clients/js/src/idls
fs.cpSync(path.join(__dirname, "..", "target", "types"), idlsTargetDir, {
  recursive: true,
});

// Render Rust.
const crateDir = path.join(clientDir, "rust");
const rustDir = path.join(clientDir, "rust", "src", "generated");
kinobi.accept(
  new k.renderRustVisitor(rustDir, {
    formatCode: true,
    crateFolder: crateDir,
  })
);
