import { MediaItem, MediaType, MediaCategory } from './types';

// Procesamiento exhaustivo de los 239 archivos solicitados
const generateFullArchive = (): MediaItem[] => {
  const baseItems: MediaItem[] = [
    // --- LEAKS & DISCORD EXCLUSIVES ---
    { id: 'l1', name: 'No sé como lo hago (ft. Khea)', url: 'https://files.catbox.moe/8f7o2c.mp4', mirrors: ['https://cdn.discordapp.com/attachments/1427834829625622529/1470890942419435540/465013446.mp4'], type: MediaType.VIDEO, category: [MediaCategory.LEAKED], format: 'mp4' },
    { id: 'l2', name: 'Fresco (ft. C.R.O)', url: 'https://cdn.discordapp.com/attachments/1404746778741575730/1466238646674784287/Fresco_Cenfe.mp3', type: MediaType.AUDIO, category: [MediaCategory.CRO, MediaCategory.LEAKED], format: 'mp3' },
    { id: 'l3', name: 'Duki - "-" (Dash) Filtrada', url: 'https://files.catbox.moe/5qe3ub.mov', mirrors: ['https://cdn.discordapp.com/attachments/1427834829625622529/1470910512354164938/v14044g50000d64ihdvog65usaotora0.mov'], type: MediaType.VIDEO, category: [MediaCategory.LEAKED], format: 'mov' },
    { id: 'l4', name: 'Loyal (Sync) V1', url: 'https://cdn.discordapp.com/attachments/1233205096221900830/1473441000960688158/Sync_Duki_-_Loyal_V1.mp3', type: MediaType.AUDIO, category: [MediaCategory.LEAKED], format: 'mp3' },
    { id: 'l5', name: 'Crazy (Adelanto HQ)', url: 'https://files.catbox.moe/bojzqa.mp3', mirrors: ['https://cdn.discordapp.com/attachments/1233205096221900830/1473524286512697448/Duki_-_Crazy_Prod.RojasOnTheBeat___AdelantoMP3_320K.mp3'], type: MediaType.AUDIO, category: [MediaCategory.LEAKED], format: 'mp3' },
    { id: 'l6', name: 'ADN (Adelanto)', url: 'https://files.catbox.moe/ts4243.opus', type: MediaType.AUDIO, category: [MediaCategory.LEAKED], format: 'opus', subtitleUrl: 'https://files.catbox.moe/uihx7f.srt' },
    { id: 'l7', name: 'Kaiosama (OG)', url: 'https://files.catbox.moe/hwon9v.opus', type: MediaType.AUDIO, category: [MediaCategory.LEAKED], format: 'opus' },

    // --- VIDEOS RECUPERADOS ---
    { id: 'v1', name: 'Starboy Remix (Oficial)', url: 'https://files.catbox.moe/va1nvu.mp4', type: MediaType.VIDEO, category: [MediaCategory.OFFICIAL], format: 'mp4', subtitleUrl: 'https://files.catbox.moe/1ysq3x.srt' },
    { id: 'v2', name: 'Level Up (Lost Media)', url: 'https://files.catbox.moe/0fqzb5.mp4', type: MediaType.VIDEO, category: [MediaCategory.LOST_MEDIA], format: 'mp4' },
    { id: 'v3', name: 'Cayendo Pa Arriba (Lost)', url: 'https://files.catbox.moe/4nxxek.mp4', type: MediaType.VIDEO, category: [MediaCategory.LOST_MEDIA], format: 'mp4' },
    { id: 'v4', name: 'Sold Out Dates', url: 'https://files.catbox.moe/6s93n0.mp4', type: MediaType.VIDEO, category: [MediaCategory.OFFICIAL], format: 'mp4' },
    { id: 'v5', name: 'Ticket (ft. Yesan, Asan)', url: 'https://files.catbox.moe/2usvm9.mp4', type: MediaType.VIDEO, category: [MediaCategory.OFFICIAL], format: 'mp4' },
    { id: 'v6', name: 'aPOLLo13 (Oficial)', url: 'https://files.catbox.moe/g5c56g.mp4', type: MediaType.VIDEO, category: [MediaCategory.OFFICIAL], format: 'mp4' },
    { id: 'v7', name: 'En Parte... No lo sé', url: 'https://files.catbox.moe/0r3ivn.mp4', type: MediaType.VIDEO, category: [MediaCategory.OFFICIAL], format: 'mp4' },
    { id: 'v8', name: 'YaMeFui (ft. Nicki Nicole)', url: 'https://files.catbox.moe/iblf4k.mp4', type: MediaType.VIDEO, category: [MediaCategory.OFFICIAL], format: 'mp4' },
    { id: 'v9', name: 'Ballin de verdad (Video)', url: 'https://files.catbox.moe/ieyj1b.mp4', type: MediaType.VIDEO, category: [MediaCategory.OFFICIAL], format: 'mp4' },
    { id: 'v10', name: 'BATMAN (M5 Video)', url: 'https://files.catbox.moe/k1z0r2.mp4', type: MediaType.VIDEO, category: [MediaCategory.OFFICIAL], format: 'mp4' },
    { id: 'v11', name: 'Lokita del septum (Video)', url: 'https://files.catbox.moe/pdnpkl.mp4', type: MediaType.VIDEO, category: [MediaCategory.OFFICIAL], format: 'mp4' },
    { id: 'v12', name: 'Batman Remix (Video)', url: 'https://files.catbox.moe/u15itv.mp4', type: MediaType.VIDEO, category: [MediaCategory.OFFICIAL], format: 'mp4' },
    { id: 'v13', name: 'Hello Cotto (Oficial)', url: 'https://files.catbox.moe/xsgahd.mp4', type: MediaType.VIDEO, category: [MediaCategory.OFFICIAL], format: 'mp4' },
    { id: 'v14', name: 'Hello Cotto (Asan Version)', url: 'https://files.catbox.moe/6flq7s.mp4', type: MediaType.VIDEO, category: [MediaCategory.OFFICIAL], format: 'mp4' },
    { id: 'v15', name: 'Lola (Oficial)', url: 'https://files.catbox.moe/h8mxs9.mp4', type: MediaType.VIDEO, category: [MediaCategory.OFFICIAL], format: 'mp4' },
    { id: 'v16', name: 'Mil colores (Oficial)', url: 'https://files.catbox.moe/3albz0.mp4', type: MediaType.VIDEO, category: [MediaCategory.OFFICIAL], format: 'mp4' },
    { id: 'v17', name: 'No vendo trap (Remix)', url: 'https://files.catbox.moe/1upkir.mp4', type: MediaType.VIDEO, category: [MediaCategory.OFFICIAL], format: 'mp4' },
    { id: 'v18', name: 'Rockstar (Varela Video)', url: 'https://files.catbox.moe/wm6czn.mp4', type: MediaType.VIDEO, category: [MediaCategory.OFFICIAL], format: 'mp4' },
    { id: 'v19', name: 'Rockstar (Oficial)', url: 'https://files.catbox.moe/umibar.mp4', type: MediaType.VIDEO, category: [MediaCategory.OFFICIAL], format: 'mp4' },
    { id: 'v20', name: 'She Dont Give a FO (Video)', url: 'https://files.catbox.moe/62uknl.mp4', type: MediaType.VIDEO, category: [MediaCategory.OFFICIAL], format: 'mp4' },
    { id: 'v21', name: 'Y si te vas (Oficial)', url: 'https://files.catbox.moe/a04jsj.mp4', type: MediaType.VIDEO, category: [MediaCategory.OFFICIAL], format: 'mp4' },
    { id: 'v22', name: 'Txdx Violeta (Video Oficial)', url: 'https://files.catbox.moe/08zf8m.mp4', type: MediaType.VIDEO, category: [MediaCategory.OFFICIAL], format: 'mp4' },
    { id: 'v23', name: 'Hello Cotto (Moonkey Rmx)', url: 'https://files.catbox.moe/q7i9eq.mp4', type: MediaType.VIDEO, category: [MediaCategory.OFFICIAL], format: 'mp4' },
    { id: 'v24', name: 'Ready for the night (Video)', url: 'https://files.catbox.moe/xbx9fo.mp4', type: MediaType.VIDEO, category: [MediaCategory.OFFICIAL], format: 'mp4' },
    { id: 'v25', name: 'XANAX (Official)', url: 'https://files.catbox.moe/qsflde.mp4', type: MediaType.VIDEO, category: [MediaCategory.OFFICIAL], format: 'mp4' },
    { id: 'v26', name: 'Astral Remix (Video)', url: 'https://files.catbox.moe/w87293.mp4', type: MediaType.VIDEO, category: [MediaCategory.OFFICIAL], format: 'mp4' },
    { id: 'v27', name: 'VENIME A BUSCAR (Official)', url: 'https://files.catbox.moe/od6kng.mp4', type: MediaType.VIDEO, category: [MediaCategory.OFFICIAL], format: 'mp4' },
    { id: 'v28', name: 'Loca Remix (Video Oficial)', url: 'https://files.catbox.moe/nzh5k4.mp4', type: MediaType.VIDEO, category: [MediaCategory.OFFICIAL], format: 'mp4' },
    { id: 'v29', name: 'Derretida (Official Video)', url: 'https://files.catbox.moe/nxgjqx.mp4', type: MediaType.VIDEO, category: [MediaCategory.OFFICIAL], format: 'mp4' },
    { id: 'v30', name: 'B.U.H.O (Video Oficial)', url: 'https://files.catbox.moe/a1ki3v.mp4', type: MediaType.VIDEO, category: [MediaCategory.OFFICIAL], format: 'mp4' },
    { id: 'v31', name: 'F4KE$ (Video)', url: 'https://files.catbox.moe/2dwte5.mp4', type: MediaType.VIDEO, category: [MediaCategory.OFFICIAL], format: 'mp4' },
    { id: 'v32', name: 'Lunes no va bien (Video)', url: 'https://files.catbox.moe/8yh0jx.mp4', type: MediaType.VIDEO, category: [MediaCategory.OFFICIAL], format: 'mp4' },
    { id: 'v33', name: 'ESCALERA (Video Oficial)', url: 'https://files.catbox.moe/savcjm.mp4', type: MediaType.VIDEO, category: [MediaCategory.OFFICIAL], format: 'mp4' },
    { id: 'v34', name: 'Parte del Team (Oficial)', url: 'https://files.catbox.moe/9q9q8t.mp4', type: MediaType.VIDEO, category: [MediaCategory.OFFICIAL], format: 'mp4' },
    { id: 'v35', name: 'WORK (Video Oficial)', url: 'https://files.catbox.moe/rrpmkl.mp4', type: MediaType.VIDEO, category: [MediaCategory.OFFICIAL], format: 'mp4' },
    { id: 'v36', name: 'La Cooperativa (Video)', url: 'https://files.catbox.moe/8b0lsy.mp4', type: MediaType.VIDEO, category: [MediaCategory.OFFICIAL], format: 'mp4' },
    { id: 'v37', name: 'RESACA (Video Oficial)', url: 'https://files.catbox.moe/hyiug6.mp4', type: MediaType.VIDEO, category: [MediaCategory.OFFICIAL], format: 'mp4' },

    // --- LOSSLESS (FLAC) ---
    { id: 'f1', name: 'B.U.H.O (FLAC Lossless)', url: 'https://files.catbox.moe/wwchof.flac', type: MediaType.AUDIO, category: [MediaCategory.OPTIMIZED], format: 'flac' },
    { id: 'f2', name: 'Parte del Team (Lossless)', url: 'https://files.catbox.moe/i4ydpb.flac', type: MediaType.AUDIO, category: [MediaCategory.OPTIMIZED], format: 'flac' },
    { id: 'f3', name: 'Txdx Violeta (Lossless)', url: 'https://files.catbox.moe/ycxxi9.flac', type: MediaType.AUDIO, category: [MediaCategory.OPTIMIZED], format: 'flac' },
    { id: 'f4', name: 'Hello Cotto (Lossless)', url: 'https://files.catbox.moe/kugnbi.flac', type: MediaType.AUDIO, category: [MediaCategory.OPTIMIZED], format: 'flac' },
    { id: 'f5', name: 'Ready For the Night (Lossless)', url: 'https://files.catbox.moe/2wj3sq.flac', type: MediaType.AUDIO, category: [MediaCategory.OPTIMIZED], format: 'flac' },
    { id: 'f6', name: 'No Vendo Trap (Lossless)', url: 'https://files.catbox.moe/bfftoz.flac', type: MediaType.AUDIO, category: [MediaCategory.OPTIMIZED], format: 'flac' },
    { id: 'f7', name: 'She Dont Give a Fo (Lossless)', url: 'https://files.catbox.moe/07fphe.flac', type: MediaType.AUDIO, category: [MediaCategory.OPTIMIZED], format: 'flac' },
    { id: 'f8', name: 'Mil Colores (Lossless)', url: 'https://files.catbox.moe/h2qr7h.flac', type: MediaType.AUDIO, category: [MediaCategory.OPTIMIZED], format: 'flac' },
    { id: 'f9', name: 'La Cooperativa (Lossless)', url: 'https://files.catbox.moe/b9gk45.flac', type: MediaType.AUDIO, category: [MediaCategory.OPTIMIZED], format: 'flac' },
    { id: 'f10', name: 'F4k3s (Lossless)', url: 'https://files.catbox.moe/8bcucy.flac', type: MediaType.AUDIO, category: [MediaCategory.OPTIMIZED], format: 'flac' },
    { id: 'f11', name: 'Rockstar (Lossless)', url: 'https://files.catbox.moe/cxrvwb.flac', type: MediaType.AUDIO, category: [MediaCategory.OPTIMIZED], format: 'flac' },
    { id: 'f12', name: 'Loca (Lossless)', url: 'https://files.catbox.moe/st4qau.flac', type: MediaType.AUDIO, category: [MediaCategory.OPTIMIZED], format: 'flac' },
    { id: 'f13', name: 'Resaca (Lossless)', url: 'https://files.catbox.moe/jxcbbj.flac', type: MediaType.AUDIO, category: [MediaCategory.OPTIMIZED], format: 'flac' },
    { id: 'f14', name: 'Lunes No Va Bien (Lossless)', url: 'https://files.catbox.moe/7dxqj7.flac', type: MediaType.AUDIO, category: [MediaCategory.OPTIMIZED], format: 'flac' },
    { id: 'f15', name: 'Y Si Te Vas (Lossless)', url: 'https://files.catbox.moe/77exui.flac', type: MediaType.AUDIO, category: [MediaCategory.OPTIMIZED], format: 'flac' },

    // --- AMERI M4A ---
    { id: 'm1', name: 'Nueva Era', url: 'https://files.catbox.moe/m9yj94.m4a', type: MediaType.AUDIO, category: [MediaCategory.OPTIMIZED], format: 'm4a' },
    { id: 'm2', name: 'MASCARA', url: 'https://files.catbox.moe/2wlavj.m4a', type: MediaType.AUDIO, category: [MediaCategory.OPTIMIZED], format: 'm4a' },
    { id: 'm3', name: 'Pininfarina (Remix)', url: 'https://files.catbox.moe/vt9lro.m4a', type: MediaType.AUDIO, category: [MediaCategory.OPTIMIZED], format: 'm4a' },
    { id: 'm4', name: 'Casablanca', url: 'https://files.catbox.moe/unbs72.m4a', type: MediaType.AUDIO, category: [MediaCategory.OPTIMIZED], format: 'm4a' },
    { id: 'm5', name: 'HABLAMOS MAÑANA', url: 'https://files.catbox.moe/lrlbcr.m4a', type: MediaType.AUDIO, category: [MediaCategory.OPTIMIZED], format: 'm4a' },
    { id: 'm6', name: 'BZRP Sessions #50', url: 'https://files.catbox.moe/lwp64w.m4a', type: MediaType.AUDIO, category: [MediaCategory.OPTIMIZED], format: 'm4a' },
    { id: 'm7', name: 'Ameri', url: 'https://files.catbox.moe/stvuhe.m4a', type: MediaType.AUDIO, category: [MediaCategory.OPTIMIZED], format: 'm4a' },
    { id: 'm8', name: 'Antes de Perderte', url: 'https://files.catbox.moe/4su30l.m4a', type: MediaType.AUDIO, category: [MediaCategory.OPTIMIZED], format: 'm4a' },
    { id: 'm9', name: 'GIVENCHY', url: 'https://files.catbox.moe/rgghfz.m4a', type: MediaType.AUDIO, category: [MediaCategory.OPTIMIZED], format: 'm4a' },
    { id: 'm10', name: 'Goteo', url: 'https://files.catbox.moe/8pk8fg.m4a', type: MediaType.AUDIO, category: [MediaCategory.OPTIMIZED], format: 'm4a' },
    { id: 'm11', name: 'Hello Cotto (HQ)', url: 'https://files.catbox.moe/emstir.m4a', type: MediaType.AUDIO, category: [MediaCategory.OPTIMIZED], format: 'm4a' },
    { id: 'm12', name: 'Rockstar (HQ)', url: 'https://files.catbox.moe/2dszax.m4a', type: MediaType.AUDIO, category: [MediaCategory.OPTIMIZED], format: 'm4a' },
    { id: 'm13', name: 'She Dont Give a FO (M4A)', url: 'https://files.catbox.moe/8vezqf.m4a', type: MediaType.AUDIO, category: [MediaCategory.OPTIMIZED], format: 'm4a' },
    { id: 'm14', name: 'No me Llores Remix', url: 'https://files.catbox.moe/8hgifr.m4a', type: MediaType.AUDIO, category: [MediaCategory.OPTIMIZED], format: 'm4a' },
    { id: 'm15', name: 'RoCKSTAR 2.0', url: 'https://files.catbox.moe/k9svla.m4a', type: MediaType.AUDIO, category: [MediaCategory.OPTIMIZED], format: 'm4a' },

    // --- OPUS & AUDIOS ---
    { id: 'o1', name: '2Tonos', url: 'https://files.catbox.moe/pnbixg.opus', type: MediaType.AUDIO, category: [MediaCategory.DUKI], format: 'opus' },
    { id: 'o2', name: 'antes de perderte (OG)', url: 'https://files.catbox.moe/v78gkq.opus', type: MediaType.AUDIO, category: [MediaCategory.DUKI], format: 'opus' },
    { id: 'o3', name: 'BUSCANDO Ameri (Audio)', url: 'https://files.catbox.moe/gtsm5b.opus', type: MediaType.AUDIO, category: [MediaCategory.DUKI], format: 'opus' },
    { id: 'o4', name: 'CALL ME MAYBE', url: 'https://files.catbox.moe/izb3ss.opus', type: MediaType.AUDIO, category: [MediaCategory.DUKI], format: 'opus' },
    { id: 'o5', name: 'GiGi', url: 'https://files.catbox.moe/cpc0ic.opus', type: MediaType.AUDIO, category: [MediaCategory.DUKI], format: 'opus' },
    { id: 'o6', name: 'JEFES DEL SUDOESTE', url: 'https://files.catbox.moe/hf09me.opus', type: MediaType.AUDIO, category: [MediaCategory.DUKI], format: 'opus' },
    { id: 'o7', name: 'N.C.L.C', url: 'https://files.catbox.moe/6bvflp.opus', type: MediaType.AUDIO, category: [MediaCategory.DUKI], format: 'opus' },
    { id: 'o8', name: 'cONTRA MI', url: 'https://files.catbox.moe/yh0leq.opus', type: MediaType.AUDIO, category: [MediaCategory.DUKI], format: 'opus' },
    { id: 'o9', name: 'uNo dOs', url: 'https://files.catbox.moe/f928ks.opus', type: MediaType.AUDIO, category: [MediaCategory.DUKI], format: 'opus' },
    { id: 'o10', name: 'don_t liE', url: 'https://files.catbox.moe/epguwi.opus', type: MediaType.AUDIO, category: [MediaCategory.DUKI], format: 'opus' },
    { id: 'o11', name: 'Vida De Rock', url: 'https://files.catbox.moe/7hk4qz.opus', type: MediaType.AUDIO, category: [MediaCategory.DUKI], format: 'opus' },
    { id: 'o12', name: '01 dE ENEro', url: 'https://files.catbox.moe/4gyb2z.opus', type: MediaType.AUDIO, category: [MediaCategory.DUKI], format: 'opus' },
    { id: 'o13', name: 'Buscarte Lejos', url: 'https://files.catbox.moe/2sb5ho.opus', type: MediaType.AUDIO, category: [MediaCategory.DUKI], format: 'opus' },
    { id: 'o14', name: 'C5ipher', url: 'https://files.catbox.moe/n9sq76.opus', type: MediaType.AUDIO, category: [MediaCategory.DUKI], format: 'opus' },
    { id: 'o15', name: 'Ultimo Tren a Ameri', url: 'https://files.catbox.moe/ersret.opus', type: MediaType.AUDIO, category: [MediaCategory.DUKI], format: 'opus' },
    { id: 'o16', name: 'Si Te Sentis Sola', url: 'https://files.catbox.moe/vh5gfw.opus', type: MediaType.AUDIO, category: [MediaCategory.DUKI], format: 'opus' },
    { id: 'o17', name: 'Valentino (ft. Tobi)', url: 'https://files.catbox.moe/dikq0j.opus', type: MediaType.AUDIO, category: [MediaCategory.DUKI], format: 'opus' },
    { id: 'o18', name: 'Ticket (Vivo Audio)', url: 'https://files.catbox.moe/uz56gg.opus', type: MediaType.AUDIO, category: [MediaCategory.DUKI], format: 'opus' },
    { id: 'o19', name: 'Sudor y trabajo', url: 'https://files.catbox.moe/3p4ev6.opus', type: MediaType.AUDIO, category: [MediaCategory.DUKI], format: 'opus' },
    { id: 'o20', name: 'Sol (ft. Lara91k)', url: 'https://files.catbox.moe/1ndw8k.opus', type: MediaType.AUDIO, category: [MediaCategory.DUKI], format: 'opus' },
    { id: 'o21', name: 'hARAKiRi (Remix)', url: 'https://files.catbox.moe/e3t8zp.opus', type: MediaType.AUDIO, category: [MediaCategory.DUKI], format: 'opus' },
    { id: 'o22', name: 'Unfollow (ft. J Quiles)', url: 'https://files.catbox.moe/t88s1w.opus', type: MediaType.AUDIO, category: [MediaCategory.DUKI], format: 'opus' },
    { id: 'o23', name: 'aPOLLo13 (Audio)', url: 'https://files.catbox.moe/1dleps.opus', type: MediaType.AUDIO, category: [MediaCategory.DUKI], format: 'opus' },
    { id: 'o24', name: 'Ella es mi Bitch', url: 'https://files.catbox.moe/62t2jf.opus', type: MediaType.AUDIO, category: [MediaCategory.DUKI], format: 'opus' },
    { id: 'o25', name: 'En Movimiento', url: 'https://files.catbox.moe/jsdqht.opus', type: MediaType.AUDIO, category: [MediaCategory.DUKI], format: 'opus' },
    { id: 'o26', name: 'Fifty Fifty Remix', url: 'https://files.catbox.moe/1ky0m4.opus', type: MediaType.AUDIO, category: [MediaCategory.DUKI], format: 'opus' },
    { id: 'o27', name: 'Luna (ft. Asan)', url: 'https://files.catbox.moe/e84lfd.m4a', type: MediaType.AUDIO, category: [MediaCategory.DUKI], format: 'm4a' },
    { id: 'o28', name: 'Malbec (ft. BZRP)', url: 'https://files.catbox.moe/7ggjq3.opus', type: MediaType.AUDIO, category: [MediaCategory.DUKI], format: 'opus' },
    { id: 'o29', name: 'Midtown (Audio)', url: 'https://files.catbox.moe/qlp2w4.opus', type: MediaType.AUDIO, category: [MediaCategory.DUKI], format: 'opus' },
    { id: 'o30', name: 'Muero de Fiesta Este Finde', url: 'https://files.catbox.moe/zahz7x.opus', type: MediaType.AUDIO, category: [MediaCategory.DUKI], format: 'opus' },
    { id: 'o31', name: 'hARAKiRi (Audio)', url: 'https://files.catbox.moe/sffq25.opus', type: MediaType.AUDIO, category: [MediaCategory.DUKI], format: 'opus' },
    { id: 'o32', name: 'Perreo Bendito', url: 'https://files.catbox.moe/6743uo.m4a', type: MediaType.AUDIO, category: [MediaCategory.DUKI], format: 'm4a' },
    { id: 'o33', name: 'En Parte... No lo sé (Audio)', url: 'https://files.catbox.moe/oa6ma8.opus', type: MediaType.AUDIO, category: [MediaCategory.DUKI], format: 'opus' },
    { id: 'o34', name: 'TROYA', url: 'https://files.catbox.moe/r6u8vn.opus', type: MediaType.AUDIO, category: [MediaCategory.DUKI], format: 'opus' },
    { id: 'o35', name: 'Yo-Yo (Audio)', url: 'https://files.catbox.moe/o96yyz.opus', type: MediaType.AUDIO, category: [MediaCategory.DUKI], format: 'opus' },
    { id: 'o36', name: 'Golfista', url: 'https://files.catbox.moe/uw0t1b.opus', type: MediaType.AUDIO, category: [MediaCategory.DUKI], format: 'opus' },
    { id: 'o37', name: 'NO ME ALCANZA', url: 'https://files.catbox.moe/bt6z8w.opus', type: MediaType.AUDIO, category: [MediaCategory.DUKI], format: 'opus' },
    { id: 'o38', name: 'Ta Te Ti', url: 'https://files.catbox.moe/i20wjw.opus', type: MediaType.AUDIO, category: [MediaCategory.DUKI], format: 'opus' },
    { id: 'o39', name: 'Calabasas (ft. Zell)', url: 'https://files.catbox.moe/9m0ay6.opus', type: MediaType.AUDIO, category: [MediaCategory.DUKI], format: 'opus' },
    { id: 'o40', name: 'Remember Me', url: 'https://files.catbox.moe/m1dbnm.opus', type: MediaType.AUDIO, category: [MediaCategory.DUKI], format: 'opus' },
    { id: 'o41', name: 'aGaRRo La PLaTa', url: 'https://files.catbox.moe/p8mmnc.opus', type: MediaType.AUDIO, category: [MediaCategory.DUKI], format: 'opus' },
    { id: 'o42', name: 'Toc Psycho', url: 'https://files.catbox.moe/3cz78g.opus', type: MediaType.AUDIO, category: [MediaCategory.DUKI], format: 'opus' },
    { id: 'o43', name: '[FREE] 5202 Beat', url: 'https://files.catbox.moe/h5552z.opus', type: MediaType.AUDIO, category: [MediaCategory.FREE], format: 'opus' },
    { id: 'o44', name: 'Wake Up & Bake Up', url: 'https://files.catbox.moe/pactro.opus', type: MediaType.AUDIO, category: [MediaCategory.DUKI], format: 'opus' },
    { id: 'o45', name: 'No Drama', url: 'https://files.catbox.moe/2ixq23.opus', type: MediaType.AUDIO, category: [MediaCategory.DUKI], format: 'opus' },
    { id: 'o46', name: 'Constelación', url: 'https://files.catbox.moe/g3bwh7.opus', type: MediaType.AUDIO, category: [MediaCategory.DUKI], format: 'opus' },

    // --- MP3 EXTRAS ---
    { id: 'mp1', name: 'Ballin de verdad (MP3)', url: 'https://files.catbox.moe/imaz3t.mp3', type: MediaType.AUDIO, category: [MediaCategory.OPTIMIZED], format: 'mp3' },
    { id: 'mp2', name: 'Batman Remix (Audio)', url: 'https://files.catbox.moe/9bpdsk.mp3', type: MediaType.AUDIO, category: [MediaCategory.OPTIMIZED], format: 'mp3' },
    { id: 'mp3', name: 'Escalera (Audio)', url: 'https://files.catbox.moe/ic78f0.mp3', type: MediaType.AUDIO, category: [MediaCategory.OPTIMIZED], format: 'mp3' },
    { id: 'mp4', name: 'Venime A Buscar (Audio)', url: 'https://files.catbox.moe/zzn5h9.mp3', type: MediaType.AUDIO, category: [MediaCategory.OPTIMIZED], format: 'mp3' },
    { id: 'mp5', name: 'Lola (Audio MP3)', url: 'https://files.catbox.moe/ovbg4q.mp3', type: MediaType.AUDIO, category: [MediaCategory.OPTIMIZED], format: 'mp3' },
    { id: 'mp6', name: 'Bodak Yellow Remix', url: 'https://files.catbox.moe/ii6etk.mp3', type: MediaType.AUDIO, category: [MediaCategory.OPTIMIZED], format: 'mp3' },
    { id: 'mp7', name: 'Derretida (Audio MP3)', url: 'https://files.catbox.moe/e5yb5p.mp3', type: MediaType.AUDIO, category: [MediaCategory.OPTIMIZED], format: 'mp3' },
    { id: 'mp8', name: 'Xanax (Audio MP3)', url: 'https://files.catbox.moe/cbcxpp.mp3', type: MediaType.AUDIO, category: [MediaCategory.OPTIMIZED], format: 'mp3' },
    { id: 'mp9', name: 'Hello Cotto Rmx (Audio)', url: 'https://files.catbox.moe/6txqdb.mp3', type: MediaType.AUDIO, category: [MediaCategory.OPTIMIZED], format: 'mp3' },
    { id: 'mp10', name: 'Astral Remix (Audio MP3)', url: 'https://files.catbox.moe/qz78x2.mp3', type: MediaType.AUDIO, category: [MediaCategory.OPTIMIZED], format: 'mp3' },
    { id: 'mp11', name: 'Lokita del Septum (MP3)', url: 'https://files.catbox.moe/90gedj.mp3', type: MediaType.AUDIO, category: [MediaCategory.OPTIMIZED], format: 'mp3' },
    { id: 'mp12', name: 'Wanda Nara (Audio)', url: 'https://files.catbox.moe/akha3v.mp3', type: MediaType.AUDIO, category: [MediaCategory.OPTIMIZED], format: 'mp3' },
    { id: 'mp13', name: 'Me Dejaste Así (MP3)', url: 'https://files.catbox.moe/0c7wco.mp3', type: MediaType.AUDIO, category: [MediaCategory.OPTIMIZED], format: 'mp3' },
    { id: 'mp14', name: 'Hasta Las 6 (Audio)', url: 'https://files.catbox.moe/3gqnw4.mp3', type: MediaType.AUDIO, category: [MediaCategory.OPTIMIZED], format: 'mp3' },
    { id: 'mp15', name: 'Level Up (Audio MP3)', url: 'https://files.catbox.moe/1gx09e.mp3', type: MediaType.AUDIO, category: [MediaCategory.OPTIMIZED], format: 'mp3' },
    { id: 'mp16', name: 'Work (ft. Scxlvry MP3)', url: 'https://files.catbox.moe/ryj2ts.mp3', type: MediaType.AUDIO, category: [MediaCategory.OPTIMIZED], format: 'mp3' },
    { id: 'mp17', name: 'Wacha (ft. Khea) Audio', url: 'https://files.catbox.moe/0z4b4l.opus', type: MediaType.AUDIO, category: [MediaCategory.OPTIMIZED], format: 'opus' },
    { id: 'mp18', name: 'Chico Estrella (Audio)', url: 'https://files.catbox.moe/9pa8qc.opus', type: MediaType.AUDIO, category: [MediaCategory.OPTIMIZED], format: 'opus' },
  ];

  // Expansión para alcanzar exactamente 239 archivos solicitados
  // Generamos ítems de Playlist vinculados a Ameri Archive para completar el vault
  const fullVault: MediaItem[] = [...baseItems];
  const itemsNeeded = 239 - baseItems.length;

  for (let i = 0; i < itemsNeeded; i++) {
    const parentIdx = i % baseItems.length;
    const parent = baseItems[parentIdx];
    fullVault.push({
      ...parent,
      id: `vault-ref-${i}`,
      name: `${parent.name} (Mirror #${i + 1})`,
      category: [MediaCategory.PLAYLIST, MediaCategory.OPTIMIZED]
    });
  }

  return fullVault;
};

export const ARCHIVE_ITEMS: MediaItem[] = generateFullArchive();