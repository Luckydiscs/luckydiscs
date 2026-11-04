#!/usr/bin/env node
// Blogiportin itsetesti: rikkinäinen luonnospari, jonka jokaisen vian portin pitää löytää.
// Portti, joka ei kaadu tähän, on rikki. Aja: npm run check:blog:selftest
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const dir = fs.mkdtempSync(path.join(os.tmpdir(), "blogiportti-"));
const head = (lang, extra = "") => `---
slug: itsetesti-${lang}
language: ${lang}
pair: itsetesti
title: Itsetesti
description: Portin itsetestin näyte.
category: Opas
keywords: testi
reading_time: 1
hero_image: /images/brand/discs-yyteri-beach.webp${extra}
hero_alt: testi
---
`;
fs.writeFileSync(path.join(dir, "a-fi.md"), head("fi") + [
  "# Väärä otsikkotaso",
  "Tämä on **pariton lihavointi.",
  "Linkki [puuttuvaan juttuun](/blogi/ei-ole-olemassa) ja [englantiin](/blog/disc-golf-rules-beginners).",
  "Money Shot (4 / 3 / -1 / 3) maksaa 9,90 €.",
  "Teksti\n- ja luettelo samassa kappaleessa",
  "Tässä on koko juttu yhdessä lauseessa.",
  "Lucky Discsin valikoimassa ei ole putteria.",
].join("\n\n"));
fs.writeFileSync(path.join(dir, "b-en.md"), head("en").replace("discs-yyteri-beach", "ei-olemassa") + "Fine text.");

const odotetut = [
  "tuntematon otsikkotaso", "pariton **", "artikkelia ei ole", "eri kielellä",
  "≠ tuotetaulu", "hinta \"9,90 €\"", "luettelo ja teksti", "kielletty ilmaus",
  "kansikuvaa /images/brand/ei-olemassa.webp ei ole", "sama kansikuva (ranta-kaksi-kiekkoa)",
];
let out = "";
try {
  execFileSync("node", [path.join(here, "check-blog.mjs")], { env: { ...process.env, BLOG_DRAFTS: dir }, encoding: "utf-8", stdio: "pipe" });
} catch (e) {
  out = `${e.stdout}${e.stderr}`;
}
fs.rmSync(dir, { recursive: true, force: true });
const puuttuu = odotetut.filter((o) => !out.includes(o));
if (!out) { console.error("✗ portti meni läpi rikkinäisellä näytteellä"); process.exitCode = 1; }
else if (puuttuu.length) { console.error(`✗ portti ei löytänyt: ${puuttuu.join(" | ")}\n${out}`); process.exitCode = 1; }
else console.log(`✓ itsetesti: kaikki ${odotetut.length} istutettua vikaa löytyi`);
