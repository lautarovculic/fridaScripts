// check this before https://github.com/vfsfitvnm/frida-il2cpp-bridge
// enumerate class and methods for Unity games
// discover.js — use global Il2Cpp from bridge (no require)
'use strict';
const wait = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  while (!Module.findBaseAddress('libil2cpp.so')) await wait(100);

  Il2Cpp.perform(() => {
    const asm = Il2Cpp.domain.assembly('Assembly-CSharp');
    if (!asm) { console.log('[-] Assembly-CSharp not loaded yet'); return; }
    const img = asm.image;

    const CLASS_RX = /(score|game|bird|pipe|spawner|manager|hud|ui)/i;
    const FIELD_RX = /(score|points|high.?score|best.?score)/i;
    const METH_RX  = /(add|set|increase).*score|onpass|gameover|die|ontriggerenter2d|oncollisionenter2d|update/i;

    for (const k of img.classes) {
      if (!CLASS_RX.test(k.name)) continue;

      const fields = [];
      for (const f of k.fields) {
        try {
          if (FIELD_RX.test(f.name || '')) {
            fields.push(`${f.isStatic ? 'static ' : ''}${f.type?.name || '?'} ${f.name}`);
          }
        } catch (_) {}
      }

      const methods = [];
      for (const m of k.methods) {
        try {
          if (METH_RX.test(m.name)) {
            const sig = `${m.returnType?.name || 'void'} ${k.name}::${m.name}(${m.parameters.map(p => p.type?.name || '?').join(', ')})`;
            methods.push(sig);
          }
        } catch (_) {}
      }

      if (fields.length || methods.length) {
        console.log(`\n[CLASS] ${k.name}`);
        if (fields.length)  console.log('  Fields:\n   - ' + fields.join('\n   - '));
        if (methods.length) console.log('  Methods:\n   - ' + methods.join('\n   - '));
      }
    }
  });
})();
