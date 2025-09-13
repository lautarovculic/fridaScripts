// native score
'use strict';
const wait = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  while (!Module.findBaseAddress('libil2cpp.so')) await wait(100);

  Il2Cpp.perform(() => {
    const img   = Il2Cpp.domain.assembly('Assembly-CSharp').image;
    // CHANGE THIS
    const Score = img.class('Score');
    // CHANGE THIS
    const fScore = Score.field('score');
	// CHANGE THIS
    const mUpd   = Score.method('UpdateScoreText');

    const addr = mUpd.virtualAddress;
    if (!addr) { console.log('no UpdateScoreText'); return; }

    // x0 = this
    Interceptor.attach(addr, {
      onEnter(args) {
        try {
          const self = args[0];
          // CHANGE THIS
          self.add(fScore.offset).writeS32(10000); // set score
        } catch (_) {}
      }
    });

    console.log('hook');
  });
})();
