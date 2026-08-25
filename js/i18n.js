/**
 * Cubit — i18n (English ⇄ Arabic)
 * ------------------------------------------------------------------
 * Translates every page through an exact-match dictionary applied to
 * text nodes + attributes. Cube NOTATION (R, U', F2, x/y/z, M/E/S,
 * perm names like "T Perm") intentionally stays in Latin:
 *  - elements matching the SKIP selector are never touched
 *  - translated sentences keep Latin move letters inline
 *
 * Usage: include LAST on every page:  <script src="js/i18n.js"></script>
 * A toggle button is auto-injected into .navbar__actions (or the
 * legacy .navbar-nav). Preference persists in localStorage('cubit-lang').
 * Dynamic content (algorithm cards, play buttons, search counts) is
 * covered by a MutationObserver.
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'cubit-lang';
  var HTML = document.documentElement;

  /* ======================================================================
     DICTIONARY — exact English text → Arabic
     ====================================================================== */
  var AR = {

    /* ===================== GLOBAL (Cubit pages) ===================== */
    'Skip to main content': 'تخطَّ إلى المحتوى الرئيسي',
    'Main navigation': 'التنقل الرئيسي',
    'Footer navigation': 'تنقّل التذييل',
    'Toggle theme': 'تبديل المظهر',

    // Nav / level labels
    'Learn': 'تعلَّم',
    'Beginner': 'مبتدئ',
    'Advanced': 'متقدم',
    'Pro': 'محترف',
    'Start Here': 'ابدأ من هنا',

    // Footer (shared)
    'Interactive Rubik\'s Cube learning for every level.': 'تعلّم تفاعلي لمكعب روبيك لكل المستويات.',
    'Resources': 'مصادر',
    'Algorithm Database': 'قاعدة بيانات الخوارزميات',
    'Practice Timer': 'مؤقّت التدريب',
    'Notation Cheatsheet': 'ورقة مرجعية للترميز',
    'FAQ': 'الأسئلة الشائعة',
    '© 2025 Cubit. Built for cubers, by cubers.': '© 2025 Cubit. صنعه محلّبون لمحلّبي المكعب.',
    'Cube Parts & Notation': 'أجزاء المكعب والترميز',
    'Beginner Method': 'طريقة المبتدئين',
    'Advanced CFOP': 'CFOP المتقدم',
    'Pro Techniques': 'تقنيات المحترفين',

    // Progress nav labels
    'Learning progress': 'تقدّم التعلم',

    /* ===================== INDEX (home) ===================== */
    'New: Algorithm 3D Visualizer': 'جديد: عارض الخوارزميات ثلاثي الأبعاد',
    'Master the Cube': 'أتقِن المكعب',
    'Interactive 3D cube visualizations. Real-time algorithm playback. Progressive curriculum from first solve to world-class.':
      'تصوّر تفاعلي للمكعب ثلاثي الأبعاد. تشغيل فوري للخوارزميات. ومنهج متدرّج من أول حلّ حتى المستوى العالمي.',
    'Start Learning': 'ابدأ التعلّم',
    'Steps to Solve': 'خطوات للحل',
    'Algorithms': 'خوارزمية',
    'Skill Levels': 'مستويات مهارة',
    'Drag': 'اسحب',
    'to rotate': 'للتدوير',
    'Scroll': 'مرِّر',
    'to zoom': 'للتقريب',
    'Why Cubit?': 'لماذا Cubit؟',
    'Built for how people actually learn — visual, interactive, and progressive.':
      'مصمَّم على الطريقة التي يتعلّم بها الناس فعلًا — بصري، وتفاعلي، ومتدرّج.',
    'Algorithm 3D Visualizer': 'عارض الخوارزميات ثلاثي الأبعاد',
    'Every algorithm renders as a live 3D cube. Watch moves execute in real-time, scrub through frame-by-frame, see exactly what each turn does.':
      'كل خوارزمية تُعرض كمكعب ثلاثي الأبعاد حيّ. شاهد الحركات تُنفَّذ لحظيًا، تنقّل إطارًا بإطار، واكتشف بدقة ما يفعله كل دوران.',
    'Progressive Curriculum': 'منهج متدرّج',
    'Four structured levels: Cube Parts & Notation → Beginner (6 steps) → Advanced CFOP (F2L/OLL/PLL) → Pro (OH, BLD, Finger Tricks).' :
      'أربعة مستويات منظمة: أجزاء المكعب والترميز، ثم المبتدئ (6 خطوات)، ثم CFOP المتقدم (F2L/OLL/PLL)، ثم المحترف (OH وBLD وحيل الأصابع).',
    'Smart Playback Controls': 'تحكّم ذكي في التشغيل',
    'Adjust speed (0.5×–2×), step forward/back, loop sections, auto-pause on complex triggers. Notation highlights sync with cube animation.':
      'اضبط السرعة (0.5×–2×)، وتقدَّم خطوة للأمام أو الخلف، وأعد تكرار المقاطع، مع إيقاف تلقائي عند الحركات المعقدة. وإبراز الترميز متزامن مع حركة المكعب.',
    'Learning Path': 'مسار التعلّم',
    'Choose your starting point or follow the complete journey.': 'اختر نقطة انطلاقك أو امشِ الرحلة كاملة.',
    'Cube anatomy, notation reference, interactive 3D scene, practice drills.':
      'تشريح المكعب، ومرجع الترميز، ومشهد تفاعلي ثلاثي الأبعاد، وتمارين تدريبية.',
    '6-step layer-by-layer method. Daisy → White Cross → Corners → Second Layer → Yellow Cross → PLL.':
      'طريقة الطبقات في 6 خطوات: الأقحوانة ثم الصليب الأبيض ثم الزوايا ثم الطبقة الثانية ثم الصليب الأصفر ثم PLL.',
    'Full CFOP: Cross optimization, 42 F2L cases, 57 OLL, 21 PLL. Algorithm library with 3D preview.':
      'CFOP كامل: تحسين الصليب، و42 حالة F2L، و57 OLL، و21 PLL. مع مكتبة خوارزميات بمعاينة ثلاثية الأبعاد.',
    'Finger tricks, One-Handed, Blindfolded (3-Style), COLL/ZBLL, competition prep.':
      'حيل الأصابع، وبيد واحدة، ومعصوب العينين (3-Style)، وCOLL/ZBLL، والاستعداد للمنافسات.',
    'Ready for your first solve?': 'مستعد لأول حلّ لك؟',
    'Start with the fundamentals — cube parts, notation, and your first algorithm — all with interactive 3D guidance.':
      'ابدأ بالأساسيات — أجزاء المكعب والترميز وأول خوارزمية لك — كل ذلك بإرشاد تفاعلي ثلاثي الأبعاد.',
    'Begin Learning Free': 'ابدأ التعلّم مجانًا',

    /* ===================== LEARN ===================== */
    'Learn the Cube': 'تعلَّم المكعب',
    'Master the fundamentals — cube anatomy, standard notation, and your first moves — all with an interactive 3D cube.':
      'أتقِن الأساسيات — تشريح المكعب والترميز القياسي وأولى حركاتك — كل ذلك مع مكعب تفاعلي ثلاثي الأبعاد.',
    'Cube Anatomy': 'تشريح المكعب',
    'Understand the pieces before you turn.': 'افهم القطع قبل أن تُدير.',
    'Centers (6)': 'المراكز (6)',
    'Fixed pieces that define each face color. They never move relative to each other — white is always opposite yellow, red opposite orange, blue opposite green.':
      'قطع ثابتة تحدد لون كل وجه. لا تتحرك أبدًا بالنسبة لبعضها — الأبيض دائمًا مقابل الأصفر، والأحمر مقابل البرتقالي، والأزرق مقابل الأخضر.',
    'Edges (12)': 'الحواف (12)',
    'Two-colored pieces between centers. 12 total. Each belongs to exactly two faces (e.g., white-red edge). Orientation matters — flipped edges are unsolved.':
      'قطع بلونين بين المراكز، عددها 12. تنتمي كل واحدة إلى وجهين بالضبط (مثل حافة أبيض-أحمر). الاتجاه مهم — الحواف المقلوبة تُعد غير محلولة.',
    'Corners (8)': 'الزوايا (8)',
    'Three-colored pieces at cube corners. 8 total. Each belongs to three faces (e.g., white-red-blue). Twisted corners are unsolved — orientation is key.':
      'قطع بثلاثة ألوان عند زوايا المكعب، عددها 8. تنتمي كل واحدة إلى ثلاثة أوجه (مثل أبيض-أحمر-أزرق). الزوايا الملتوية تُعد غير محلولة — الاتجاه هو المفتاح.',
    'Interactive Cube': 'المكعب التفاعلي',
    'Turn faces, explore the cube, practice notation. Click face buttons or drag the cube.':
      'أدر الوجوه واستكشف المكعب وتدرّب على الترميز. انقر أزرار الوجوه أو اسحب المكعب.',
    'rotate': 'تدوير',
    'zoom': 'تكبير',
    'Face turn controls': 'أزرار دوران الوجوه',
    'Whole-cube rotation controls (x / y / z)': 'أزرار تدوير المكعب كاملًا (x / y / z)',
    'Scramble': 'خلط',
    'Scramble cube': 'اخلط المكعب',
    'Reset': 'إعادة ضبط',
    'Reset cube to solved': 'أعد المكعب إلى حالته المحلولة',
    'Standard Notation': 'الترميز القياسي',
    'Singmaster notation — the universal language of cubing.': 'ترميز سينغماستر — اللغة العالمية لتجميع المكعب.',
    'Face Turns': 'دورانات الوجوه',
    'Up face (white) clockwise 90°': 'الوجه العلوي (الأبيض) مع عقارب الساعة 90°',
    'Up face counter-clockwise 90°': 'الوجه العلوي عكس عقارب الساعة 90°',
    'Up face 180° (direction irrelevant)': 'الوجه العلوي 180° (الاتجاه غير مهم)',
    'Down face (yellow) clockwise 90°': 'الوجه السفلي (الأصفر) مع عقارب الساعة 90°',
    'Right face (red) clockwise 90°': 'الوجه الأيمن (الأحمر) مع عقارب الساعة 90°',
    'Left face (orange) clockwise 90°': 'الوجه الأيسر (البرتقالي) مع عقارب الساعة 90°',
    'Front face (green) clockwise 90°': 'الوجه الأمامي (الأخضر) مع عقارب الساعة 90°',
    'Back face (blue) clockwise 90°': 'الوجه الخلفي (الأزرق) مع عقارب الساعة 90°',
    'Wide & Slice Moves': 'الحركات العريضة وحركات الشرائح',
    'Wide R — Right two layers together (lowercase on 3x3)': 'R العريضة — الطبقتان اليمنى معًا (بحرف صغير في مكعب 3x3)',
    'Wide L — Left two layers together (lowercase on 3x3)': 'L العريضة — الطبقتان اليسرى معًا (بحرف صغير في مكعب 3x3)',
    'Wide U — Up two layers together (lowercase on 3x3)': 'U العريضة — الطبقتان العلويتان معًا (بحرف صغير في مكعب 3x3)',
    'Middle slice (between L/R) — follows L': 'الشريحة الوسطى (بين L/R) — تتبع اتجاه L',
    'Equatorial slice (between U/D) — follows D': 'الشريحة الاستوائية (بين U/D) — تتبع اتجاه D',
    'Standing slice (between F/B) — follows F': 'الشريحة الواقفة (بين F/B) — تتبع اتجاه F',
    'Cube Rotations': 'تدويرات المكعب',
    'Rotate whole cube on R axis (like R)': 'تدوير المكعب كله حول محور R (مثل R)',
    'Rotate whole cube on U axis (like U)': 'تدوير المكعب كله حول محور U (مثل U)',
    'Rotate whole cube on F axis (like F)': 'تدوير المكعب كله حول محور F (مثل F)',
    'Notation Key': 'مفتاح الترميز',
    'Clockwise 90°': 'مع عقارب الساعة 90°',
    'Counter-clockwise 90°': 'عكس عقارب الساعة 90°',
    '180° turn': 'نصف دورة 180°',
    'Wide move — 2 layers (lowercase on 3x3; "Rw" is 4x4 notation)': 'حركة عريضة — طبقتان (بحرف صغير في 3x3؛ وصيغة "Rw" لترميز 4x4)',
    'Slice move (inner layer)': 'حركة شريحة (طبقة داخلية)',
    'Whole cube rotation': 'تدوير المكعب كاملًا',
    'Practice Drills': 'تمارين تدريبية',
    'Build muscle memory with guided exercises.': 'ابنِ الذاكرة العضلية بتمارين موجّهة.',
    'Face Recognition': 'التعرّف على الوجوه',
    'Identify each face by center color. Practice U, R, F, L, B, D turns until automatic.':
      'تعرف على كل وجه من لون مركزه. تدرّب على دورانات U وR وF وL وB وD حتى تصبح تلقائية.',
    'Try on Cube': 'جرِّبها على المكعب',
    'Play on Cube': 'شغّلها على المكعب',
    'Sexy Move': 'الحركة السحرية (Sexy Move)',
    'The fundamental 4-move trigger. Returns cube to original state after 6 repetitions.':
      'الحركة الأساسية المؤلفة من 4 دورانات. تعيد المكعب إلى حالته الأصلية بعد 6 تكرارات.',
    'Sledgehammer': 'المطرقة (Sledgehammer)',
    'Mirror of sexy move. Essential for F2L and many OLL/PLL algorithms.':
      'نسخة معكوسة من الحركة السحرية. أساسية في F2L وفي كثير من خوارزميات OLL/PLL.',
    'Four-Spot Pattern': 'نمط البقع الأربع',
    'Classic beginner pattern. Visualizes how centers stay fixed while edges/corners move.':
      'نمط كلاسيكي للمبتدئين. يوضح كيف تبقى المراكز ثابتة بينما تتحرك الحواف والزوايا.',
    'Ready to Solve?': 'جاهز للحل؟',
    'You know the pieces and the notation. Now learn the 6-step beginner method — your first complete solve awaits.':
      'أنت تعرف القطع والترميز. الآن تعلَّم طريقة المبتدئين في 6 خطوات — أول حلٍّ كامل لك في الانتظار.',
    'Start Beginner Method': 'ابدأ طريقة المبتدئين',

    /* ===================== BEGINNER ===================== */
    'Level 02': 'المستوى 02',
    'Level 03': 'المستوى 03',
    'Level 04': 'المستوى 04',
    'Yellow Face (OLL)': 'الوجه الأصفر (OLL)',
    'Goal: Make the entire top face yellow. Two algorithms — Sune and Anti-Sune — handle every corner case.':
      'الهدف: جعل الوجه العلوي كله أصفر. خوارزميتان — سوني وأنتي-سوني — تكفيان لكل حالات الزوايا.',
    'Permute Last Layer (PLL)': 'ترتيب الطبقة الأخيرة (PLL)',
    'Goal: With the yellow face up, move each last-layer piece to its correct spot. Three algorithms finish the cube.':
      'الهدف: مع بقاء الوجه الأصفر لأعلى، انقل كل قطعة من الطبقة الأخيرة إلى موضعها الصحيح. ثلاث خوارزميات تُكمل المكعب.',
    'Yellow corners don\'t need to be in the right place yet — only facing up.':
      'لا يلزم أن تكون الزوايا الصفراء في مواضعها الصحيحة بعد — يكفي أن تكون متجهة لأعلى.',
    'Rotate the top layer and repeat Sune until the whole top face is yellow.':
      'أدر الطبقة العليا وكرر سوني حتى يصبح الوجه العلوي كله أصفر.',
    'Solved! If two pieces are swapped, apply the matching algorithm once more.':
      'تم الحل! إذا كانت هناك قطعتان متبادلتان، طبّق الخوارزمية الموائمة مرة أخرى.',
    'OLL step visualization': 'عرض خطوة OLL',
    'PLL step visualization': 'عرض خطوة PLL',
    'The classic 6-step layer-by-layer solve. Memorize 7 algorithms and solve any cube in ~2 minutes. Start here if you\'re new.':
      'طريقة الطبقات الكلاسيكية في 6 خطوات. احفظ 7 خوارزميات وحلّ أي مكعب في نحو دقيقتين. ابدأ من هنا إن كنت مبتدئًا.',
    'The 6 Steps': 'الخطوات الست',
    'Solve layer by layer — no advanced concepts required.': 'حُلّ طبقة بعد طبقة — دون مفاهيم متقدمة.',
    'Daisy': 'الأقحوانة',
    'Place 4 white edge stickers around the yellow center.': 'ضَع 4 ملصقات حواف بيضاء حول المركز الأصفر.',
    'White Cross': 'الصليب الأبيض',
    'Flip daisy down to form the white cross on bottom.': 'اقلب الأقحوانة للأسفل لتكوين الصليب الأبيض في القاع.',
    'White Corners': 'الزوايا البيضاء',
    'Solve all 4 white corner pieces.': 'حُلّ قطع الزوايا البيضاء الأربع.',
    'Second Layer': 'الطبقة الثانية',
    'Insert 4 middle-layer edges.': 'أدخل حواف الطبقة الوسطى الأربع.',
    'Yellow Cross': 'الصليب الأصفر',
    'Form the yellow cross on top (Algorithm 1).': 'كوِّن الصليب الأصفر في الأعلى (الخوارزمية 1).',
    'Solve (OLL + PLL)': 'إكمال الحل (OLL + PLL)',
    'Orient + permute yellow corners and edges (Algorithms 2–7).': 'وجّه رؤوس القطع الصفراء ورتّب مواقعها (الخوارزميات 2–7).',
    'Step 01': 'الخطوة 01',
    'yellow center': 'المركز الأصفر',
    'bottom face': 'الوجه السفلي',
    'Step 02': 'الخطوة 02',
    'Step 03': 'الخطوة 03',
    'Step 04': 'الخطوة 04',
    'Step 05': 'الخطوة 05',
    'Step 06': 'الخطوة 06',
    'Step 07': 'الخطوة 07',
    // Step 1
    'Goal: 4 white edge stickers surrounding the': 'الهدف: 4 ملصقات حواف بيضاء تحيط',
    '(top face). This is setup for the white cross.': '(بالوجه العلوي). هذه هي الخطوة التحضيرية للصليب الأبيض.',
    '(top face). This is the setup for the white cross.': '(بالوجه العلوي). هذه هي الخطوة التحضيرية للصليب الأبيض.',
    'Hold the yellow center facing up.': 'أمسك المكعب بحيث يكون المركز الأصفر لأعلى.',
    'Find white edge pieces (the ones with white).': 'ابحث عن قطع الحواف البيضاء (التي تحمل اللون الأبيض).',
    'Move each white edge to sit next to the yellow center.': 'انقل كل حافة بيضاء لتجاور المركز الأصفر.',
    'No algorithm needed — just position them with intuition.': 'لا حاجة لأي خوارزمية — فقط ضعها بحدسك.',
    'Look for the yellow center on top, build white petals around it.':
      'ابحث عن المركز الأصفر في الأعلى، وبنِ البتلات البيضاء حوله.',
    // Step 2
    'Goal: Flip the daisy down to form a white cross on the': 'الهدف: اقلب الأقحوانة للأسفل لتكوين صليب أبيض على',
    '(D). Align each white edge with its center color.': '(D). حاذِ كل حافة بيضاء مع لون مركزها.',
    'Turn each daisy edge down with F2, R2, L2, or B2.': 'أدر كل حافة من الأقحوانة إلى الأسفل بواسطة F2 أو R2 أو L2 أو B2.',
    'Match the side sticker to the center color.': 'طابق الملصق الجانبي مع لون المركز.',
    'Repeat for all 4 edges until the cross is aligned.': 'كرر ذلك للحedges الأربع حتى يتساوى الصليب.',
    'Each edge\'s side color must line up with its matching center.':
      'يجب أن يتطابق اللون الجانبي لكل حافة مع مركزه الموافق.',
    // Step 3
    'Goal: Solve all 4 white corners. Find each white corner piece, position it above its target slot, then repeat the right-hand algorithm until it drops in.':
      'الهدف: حُلّ الزوايا البيضاء الأربع. اعثر على كل زاوية بيضاء، وضعها فوق موضعها المستهدف، ثم كرر خوارزمية اليد اليمنى حتى تستقر في مكانها.',
    'Right-Hand Algorithm': 'خوارزمية اليد اليمنى',
    'Find a white corner; bring it above its correct slot on D.': 'اعثر على زاوية بيضاء؛ وأحضرها فوق موضعها الصحيح في الوجه D.',
    'If white faces right: do': 'إذا كان الأبيض نحو اليمين: نفّذ',
    'once or twice.': 'مرة أو مرتين.',
    'If white faces front: do': 'إذا كان الأبيض نحو الأمام: نفّذ',
    // Step 4
    'Goal: Insert 4 middle-layer edges into the second (E) layer. Use one of two "sexy-sledge" algorithms depending on edge direction.':
      'الهدف: أدخل حواف الطبقة الوسطى الأربع إلى الطبقة الثانية (E). استخدم إحدى خوارزميتَي «سيكسي-سليدج» حسب اتجاه الحافة.',
    'Left Insert (edge goes left)': 'الإدخال الأيسر (الحافة تتجه يسارًا)',
    'Right Insert (edge goes right)': 'الإدخال الأيمن (الحافة تتجه يمينًا)',
    'Find an edge in the top layer with no yellow.': 'اعثر على حافة في الطبقة العليا بلا لون أصفر.',
    'Match its side color to the center, note which way it points.': 'طابق لونها الجانبي مع المركز ولاحظ الجهة التي تشير إليها.',
    'Apply the left or right insert algorithm.': 'طبّق خوارزمية الإدخال اليسرى أو اليمنى.',
    // Step 5
    'Goal: Form a yellow cross on top (U). Yellow corners don\'t need to be oriented yet — just the cross shape.':
      'الهدف: تكوين الصليب الأصفر في الأعلى (U). لا يلزم توجيه الزوايا الصفراء بعد — يكفي شكل الصليب.',
    'Algorithm 1 — Yellow Cross': 'الخوارزمية 1 — الصليب الأصفر',
    'Dot (0 yellow edges): do Algorithm 1 once → L-shape.': 'النقطة (0 حافة صفراء): نفّذ الخوارزمية 1 مرة ← ينتج شكل L.',
    'L-shape: orient toward top-left, do Algorithm 1 → Line.': 'شكل L: وجّهه نحو أعلى اليسار ونفّذ الخوارزمية 1 ← ينتج خط.',
    'Line (horizontal): do Algorithm 1 → Cross.': 'الخط (أفقي): نفّذ الخوارزمية 1 ← ينتج الصليب.',
    // Step 6
    'Goal: Orient all yellow stickers up (OLL), then permute pieces to finish (PLL). Five algorithms complete the cube.':
      'الهدف: وجّه جميع الملصقات الصفراء لأعلى (OLL)، ثم رتّب مواقع القطع للانتهاء (PLL). خمس خوارزميات تكمل المكعب.',
    'Algorithm 2 — OLL (Sune)': 'الخوارزمية 2 — OLL (سوني)',
    'Algorithm 3 — OLL (Anti-Sune)': 'الخوارزمية 3 — OLL (أنتي-سوني)',
    'Algorithm 4 — PLL (Ua Perm)': 'الخوارزمية 4 — PLL (تصفية Ua)',
    'Algorithm 5 — PLL (Ub Perm)': 'الخوارزمية 5 — PLL (تصفية Ub)',
    'If yellow not all up: use Sune or Anti-Sune (Algorithms 2–3).':
      'إن لم تكن كل القطع الصفراء لأعلى: استخدم سوني أو أنتي-سوني (الخوارزميتان 2–3).',
    'Algorithm 6 — Corner Cycle (Clockwise)': 'الخوارزمية 6 — دوران الزوايا (مع عقارب الساعة)',
    'Algorithm 7 — Corner Cycle (Counter-Clockwise)': 'الخوارزمية 7 — دوران الزوايا (عكس عقارب الساعة)',
    'Corners come first: turn the top layer until one corner sits in its correct place (its side colors match).':
      'الزوايا أولًا: أدر الطبقة العليا حتى تستقر إحدى الزوايا في مكانها الصحيح (بأن يتطابق لونا جانبيها).',
    'Hold that corner at the front-left and apply Algorithm 6 (or 7 for the opposite direction) until every corner is solved.':
      'أمسك تلك الزاوية عند الأمام-يسار وطبّق الخوارزمية 6 (أو 7 للاتجاه المعاكس) حتى تُحل كل الزوايا.',
    'Then solve the edges: hold any solved edge at the back and use Algorithm 4 or 5 (Ua/Ub perm) until they match.':
      'ثم حُل الحواف: أمسك أي حافة في موضعها الصحيح تجاه الخلف واستخدم الخوارزمية 4 أو 5 (تصفية Ua/Ub) حتى تتطابق جميعها.',
    'Position yellow corners with Algorithm 4 or 5 (Ua/Ub perm).':
      'رتّب الزوايا الصفراء بالخوارزمية 4 أو 5 (تصفية Ua/Ub).',
    'If 2 corners swapped: use Algorithm 6/7, then re-check.':
      'إن كانت هناك زاويتان متبادلتان: استخدم الخوارزمية 6/7 ثم أعد الفحص.',
    'Position yellow edges with Algorithm 4 or 5 again.': 'رتّب الحواف الصفراء بالخوارزمية 4 أو 5 مرة أخرى.',
    'Solved your first cube?': 'حللت مكعبك الأول؟',
    'You\'ve got the fundamentals. Take the next step: Advanced CFOP cuts your solve time in half with smarter algorithms.':
      'أنت الآن تملك الأساسيات. اتخذ الخطوة التالية: يقلّل CFOP المتقدم وقت حلّك إلى النصف بخوارزميات أذكى.',
    'Explore Advanced CFOP': 'استكشف CFOP المتقدم',

    /* ===================== ADVANCED ===================== */
    'Advanced CFOP': 'CFOP المتقدم',
    'Cross, F2L, OLL, PLL — the speedcubing standard. 57 OLL + 21 PLL + intuitive F2L. All with interactive 3D playback.':
      'Cross وF2L وOLL وPLL — المعيار العالمي للتجميع السريع. 57 OLL + 21 PLL + F2L حدسي. وكلها بتشغيل تفاعلي ثلاثي الأبعاد.',
    'Search Algorithms': 'ابحث في الخوارزميات',
    'Find any F2L, OLL, or PLL case by name, notation, or description.':
      'اعثر على أي حالة F2L أو OLL أو PLL بالاسم أو الترميز أو الوصف.',
    'Search algorithms across F2L, OLL and PLL': 'ابحث في خوارزميات F2L وOLL وPLL',
    'Search algorithms — e.g. Sune, Ua perm, F2L 21...': 'ابحث عن خوارزمية — مثل Sune أو Ua perm أو F2L 21...',
    'CFOP Stages': 'مراحل CFOP',
    'Four stages, from cross to solved. Master each before moving on.': 'أربع مراحل من الصليب حتى الحل الكامل. أتقِن كل مرحلة قبل الانتقال.',
    'Cross': 'الصليب (Cross)',
    'Intuitive bottom cross in 8 moves avg. Color-neutral preferred.': 'صليب سفلي حدسي بمتوسط 8 حركات. ويُفضَّل الحيادية اللونية.',
    'F2L': 'F2L',
    '42 standard cases. Pair corners/edges, insert to slots. 4 slots.': '42 حالة قياسية. قرن الزوايا/الحواف وأدخلها في الفتحات. 4 فتحات.',
    'OLL': 'OLL',
    '57 algorithms orient last layer. Learn 2-look first (10 algs).': '57 خوارزمية لتوجيه الطبقة الأخيرة. تعلَّم 2-look أولًا (10 خوارزميات).',
    'PLL': 'PLL',
    '21 algorithms permute last layer. Learn all for full CFOP.': '21 خوارزمية لترتيب الطبقة الأخيرة. احفظها كلها لCFOP كامل.',
    'The foundation of every solve. Plan in inspection, execute blind.':
      'أساس كل عملية حل. خطِّط أثناء المعاينة ونفّذ دون نظر.',
    'Color-Neutral Cross': 'الصليب الحيادي اللوني',
    'Start on any color. Best cross = fewest moves (avg 6–8). Look for easy edges during 15-second inspection.':
      'ابدأ بأي لون. أفضل صليب = أقل عدد حركات (متوسط 6–8). ابحث عن الحواف السهلة خلال 15 ثانية من المعاينة.',
    'Opposite colors:': 'الألوان المتقابلة:',
    'White/Yellow, Red/Orange, Blue/Green': 'أبيض/أصفر، أحمر/برتقالي، أزرق/أخضر',
    'Key technique:': 'التقنية الأساسية:',
    'Practice:': 'تدريب:',
    'Keyhole / multi-slot for extra efficiency': 'الثقب المفتاحي / الفتحات المتعددة لكفاءة أعلى',
    'Solve cross blindfolded (just close eyes after inspection)': 'حُلّ الصليب معصوب العينين (فقط أغمض عينيك بعد المعاينة)',
    'Example: White Cross (scramble)': 'مثال: الصليب الأبيض (خلطة)',
    'F2L — First Two Layers': 'F2L — الطبقتان الأولان',
    '42 standard cases. Intuitive pairing, then insert. Master these for sub-20.':
      '42 حالة قياسية. قرن حدسي ثم إدخال. أتقنها لتحطيم حاجز 20 ثانية.',
    'Basic (1–12)': 'أساسية (1–12)',
    'Advanced (13–42)': 'متقدمة (13–42)',
    'Special Cases': 'حالات خاصة',
    'OLL — Orientation of Last Layer': 'OLL — توجيه الطبقة الأخيرة',
    '57 cases to orient all yellow stickers up. Learn 2-look OLL (10 algs) first.':
      '57 حالة لتوجيه كل الملصقات الصفراء لأعلى. تعلَّم OLL بنظرتين (10 خوارزميات) أولًا.',
    '2-Look OLL (10)': 'OLL بنظرتين (10)',
    'Full OLL (57)': 'OLL الكاملة (57)',
    'Step 1: Orient Edges (3 algs)': 'الخطوة 1: توجيه الحواف (3 خوارزميات)',
    'Step 2: Orient Corners (7 algs)': 'الخطوة 2: توجيه الزوايا (7 خوارزميات)',
    'PLL — Permutation of Last Layer': 'PLL — ترتيب الطبقة الأخيرة',
    '21 cases to permute last layer pieces. All required for full CFOP.':
      '21 حالة لترتيب قطع الطبقة الأخيرة. كلها ضرورية لـCFOP الكامل.',
    'Edge Perms (4)': 'تصفيات الحواف (4)',
    'Corner Perms (6)': 'تصفيات الزوايا (6)',
    'G-Perms (4)': 'تصفيات G (4)',
    'Other (7)': 'أخرى (7)',
    'Mastered CFOP?': 'أتقنت CFOP؟',
    'Sub-15 is within reach. Go Pro: finger tricks, One-Handed, Blindfolded, COLL/ZBLL, competition prep.':
      'كسر حاجز 15 ثانية في متناول يدك. انتقل للمحترفين: حيل الأصابع، وبيد واحدة، ومعصوب العينين، وCOLL/ZBLL، والاستعداد للمنافسات.',
    'Enter Pro Level': 'ادخل مستوى المحترفين',
    'F2L case categories': 'تصنيفات حالات F2L',
    'OLL case categories': 'تصنيفات حالات OLL',
    'PLL case categories': 'تصنيفات حالات PLL',

    /* ===================== PRO ===================== */
    'Finger tricks, One-Handed, Blindfolded, COLL/ZBLL, and competition mastery. The final frontier.':
      'حيل الأصابع، وبيد واحدة، ومعصوب العينين، وCOLL/ZBLL، وإتقان المنافسات. الحدود النهائية.',
    'Pro Skill Tree': 'شجرة مهارات المحترفين',
    'Beyond CFOP — specialized disciplines for elite performance.':
      'ما وراء CFOP — تخصصات للأداء النخبوي.',
    'Finger Tricks': 'حيل الأصابع',
    'Regripless execution, double flicks, push turns. Sub-10 foundation.':
      'تنفيذ دون إعادة قبضة، ونقرات مزدوجة، ودورانات دفع. أساس كسر حاجز 10 ثوانٍ.',
    'One-Handed': 'بيد واحدة',
    'OH notation, R/U/L/F moves, table abuse. Sub-20 OH is elite.':
      'ترميز OH وحركات R/U/L/F والاستعانة بالطاولة. حلّ OH دون 20 ثانية إنجاز نخبوي.',
    'Blindfolded': 'معصوب العينين',
    '3-Style, M2/OP, letter pairs, memo techniques. The memory sport.':
      '3-Style وM2/OP وأزواج الحروف وتقنيات الحفظ. رياضة الذاكرة.',
    'COLL / ZBLL': 'COLL / ZBLL',
    '40 COLL + 493 ZBLL. One-look last layer. The ultimate grind.': '40 COLL + 493 ZBLL. الطبقة الأخيرة بنظرة واحدة. التحدي الأقصى.',
    'Regripless turning. Every move flows into the next. This is where sub-10 lives.':
      'دوران دون إعادة قبضة. كل حركة تنساب إلى التالية. هنا يسكن مستوى ما دون 10 ثوانٍ.',
    'Fundamentals': 'الأساسيات',
    'Advanced Patterns': 'أنماط متقدمة',
    'Algorithm Execution': 'تنفيذ الخوارزميات',
    'Finger trick categories': 'تصنيفات حيل الأصابع',
    'One-Handed (OH)': 'بيد واحدة (OH)',
    'One hand, full control. R/U/L/F/D/B with table abuse. Different muscle memory, same logic.':
      'يد واحدة وتحكم كامل. حركات R/U/L/F/D/B مع الاستعانة بالطاولة. ذاكرة عضلية مختلفة ونفس المنطق.',
    'OH Notation & Moves': 'ترميز OH وحركاتها',
    'OH F2L': 'F2L بيد واحدة',
    'OH OLL/PLL': 'OLL/PLL بيد واحدة',
    'OH categories': 'تصنيفات بيد واحدة',
    'One-Handed Notation': 'ترميز بيد واحدة',
    'OH uses the same face letters but different finger assignments. The right hand (typically) holds the cube while fingers trigger turns.':
      'يستخدم OH نفس حروف الوجوه لكن بتوزيع مختلف للأصابع. اليد اليمنى (عادةً) تمسك المكعب بينما تُنفِّذ الأصابع الدورانات.',
    'Standard vs OH Moves': 'الحركات القياسية مقابل OH',
    'Key OH Techniques': 'تقنيات OH الأساسية',
    'Table Abuse:': 'الاستعانة بالطاولة:',
    'Use table to stabilize D/B turns': 'استخدم الطاولة لتثبيت دورانات D/B',
    'Pinky Ring Finger:': 'الخنصر والبنصر:',
    'Primary for R/R\', U/U\'': 'الأساسيان في R/R\' وU/U\'',
    'Index/Middle:': 'السبابة والوسطى:',
    'F/F\', L/L\' triggers': 'لتنفيذ F/F\' وL/L\'',
    'Wrist Rotation:': 'دوران الرسغ:',
    'Replace regrips with wrist motion': 'استبدل إعادة القبضة بحركة الرسغ',
    'OH basic trigger visualization': 'عرض تفاعلي لحركة OH الأساسية',
    'Blindfolded (3BLD)': 'معصوب العينين (3BLD)',
    'Memorize, don\'t look, solve. 3-Style commutators, M2 edges, OP corners. Pure memory sport.':
      'احفظ ثم حُل دون نظر. مبادلات 3-Style وحواف M2 وزوايا OP. رياضة ذاكرة خالصة.',
    'Methods Overview': 'نظرة على الطرق',
    'Edge Methods (M2/3-Style)': 'طرق الحواف (M2/3-Style)',
    'Corner Methods (OP/3-Style)': 'طرق الزوايا (OP/3-Style)',
    'Memorization': 'الحفظ',
    'Blindfolded categories': 'تصنيفات معصوب العينين',
    'Old Pochmann (OP)': 'أولد بوشمان (OP)',
    'Classic beginner BLD method. Swap buffer with target using setup moves + T/Y/J perms. ~100 moves per solve.':
      'طريقة BLD الكلاسيكية للمبتدئين. بدّل القطعة المرجعية بالمستهدفة باستخدام حركات تجهيز + تصفيات T/Y/J. نحو 100 حركة لكل حل.',
    'Corner Buffer: UBL': 'الزاوية المرجعية: UBL',
    'M2 / OP Hybrid': 'الطريقة الهجينة M2 / OP',
    'Intermediate': 'متوسط',
    'M2 for edges (faster, fewer moves), OP for corners. Standard intermediate approach. ~70 moves per solve.':
      'M2 للحواف (أسرع وبحركات أقل) وOP للزوايا. النهج الوسيط المعياري. نحو 70 حركة لكل حل.',
    'M2 Edge Swap': 'تبديل الحواف M2',
    '3-Style (Commutators)': 'ثلاثي النمط (المبادلات)',
    'Full 3-cycle commutators for both edges and corners. 400+ algs but 30-40 moves per solve. World-class standard.':
      'مبادلات دوران ثلاثي كاملة للحواف والزوايا معًا. أكثر من 400 خوارزمية لكن 30-40 حركة لكل حل. المعيار العالمي.',
    'Example: [R U R\' D2, R U\' R\']': 'مثال: [R U R\' D2, R U\' R\']',
    'Memorization Techniques': 'تقنيات الحفظ',
    'Turn cube states into memorable images. Letter pairs → audio/visual images → journey method.':
      'حوّل حالات المكعب إلى صور لا تُنسى. أزواج حروف ← صور صوتية/بصرية ← طريقة الرحلة.',
    'Letter Scheme (Speffz)': 'مخطط الحروف (Speffz)',
    'UBL = A, UBR = B, UFL = C, UFR = D...': 'UBL = A، وUBR = B، وUFL = C، وUFR = D...',
    'Audio Loop (for edges)': 'الحلقة الصوتية (للحواف)',
    'Speak letter pairs rhythmically: "AB CD EF GH" → "Apple Butterfly Cat Dog Elephant Fish..." Create vivid, weird images.':
      'انطق أزواج الحروف بإيقاع: «AB CD EF GH» ← «تفاحة فراشة قطة كلب...». اصنع صورًا حية وغرابة.',
    'Journey Method (for corners)': 'طريقة الرحلة (للزوايا)',
    'Place images along a familiar route (your house). Each location = one letter pair. Recall by mentally walking the route.':
      'ضع الصور على طول مسار مألوف (منزلك مثلًا). كل موقع = زوج حروف واحد. واستدعِ بتفقّد المسار ذهنيًا.',
    'BLD commutator example': 'مثال مبادلة BLD',
    'COLL & ZBLL': 'COLL وZBLL',
    'One-look last layer. COLL: 40 algs (corners + orientation). ZBLL: 493 algs (full 1LLL). The final frontier.':
      'الطبقة الأخيرة بنظرة واحدة. COLL: 40 خوارزمية (زوايا + توجيه). ZBLL: 493 خوارزمية (1LLL كاملة). الحدود النهائية.',
    'COLL (40)': 'COLL (40)',
    'ZBLL Subsets': 'المجموعات الجزئية من ZBLL',
    'Full ZBLL (493)': 'ZBLL الكاملة (493)',
    'COLL/ZBLL categories': 'تصنيفات COLL/ZBLL',
    'COLL subsets': 'مجموعات COLL الجزئية',
    'COLL solves corner orientation + permutation when edges are already oriented (after EO cross). 40 cases, recognizable by corner patterns.':
      'تحلّ COLL توجيه الزوايا وترتيبها عندما تكون الحواف موجّهة أصلًا (بعد صليب EO). 40 حالة تُميَّز بأنماط الزوايا.',
    'Sune/Anti-Sune (6)': 'سوني/أنتي-سوني (6)',
    'Pi (6)': 'باي (6)',
    'H (4)': 'H (4)',
    'U/T/L (12)': 'U/T/L (12)',
    'Other (12)': 'أخرى (12)',
    'ZBLL = ZBLS (Zborowski-Bruchem Last Slot) + 1LLL. Learn in subsets: T, U, L, Pi, H, Sune, Anti-Sune. Each subset ~40-80 algs.':
      'ZBLL = ZBLS (الفتحة الأخيرة لـزبوروفسكي-بروخيم) + 1LLL. تعلّمها على مجموعات: T وU وL وPi وH وسوني وأنتي-سوني. كل مجموعة نحو 40-80 خوارزمية.',
    'T-Set (80)': 'مجموعة T (80)',
    'Most common, highest ROI. TUL, TUR, TFR, TFL variants.': 'الأكثر شيوعًا وأعلى مردودًا. بصيغها TUL وTUR وTFR وTFL.',
    'U-Set (80)': 'مجموعة U (80)',
    'Headlights cases. Very recognizable. High frequency in solves.': 'حالات المصابيح الأمامية. سهلة التمييز جدًا وشائعة في الحلول.',
    'L-Set (80)': 'مجموعة L (80)',
    'Bowtie shape. Good recognition, flows well from F2L.': 'شكل ربطة العنق. تمييز جيد وانسجام ممتاز مع F2L.',
    'Pi-Set (80)': 'مجموعة Pi (80)',
    'Air Jeff shape. Symmetric, easy to recognize.': 'شكل إير جيف. متماثل وسهل التمييز.',
    'H-Set (40)': 'مجموعة H (40)',
    'Pure corner perm. Fewer algs, very fast execution.': 'تصفية زوايا خالصة. خوارزميات أقل وتنفيذ سريع جدًا.',
    'Sune/AS (40 each)': 'سوني/أنتي-سوني (40 لكل منهما)',
    'Fish shapes. Good for OH too. Lower frequency but high value.': 'أشكال السمكة. جيدة أيضًا لبيد واحدة. أقل شيوعًا لكنها عالية القيمة.',
    '80 algs': '80 خوارزمية',
    '40 algs': '40 خوارزمية',
    'Full ZBLL: 493 Algorithms': 'ZBLL الكاملة: 493 خوارزمية',
    'Total Algorithms': 'إجمالي الخوارزميات',
    'Months to Learn': 'أشهر للتعلّم',
    'Sec Avg Benefit': 'ثانية مكسبًا وسطيًا',
    'Regrips (1LLL)': 'إعادة قبضة (1LLL)',
    'Learning full ZBLL is a 6-12 month commitment. Most cubers learn COLL + subset of ZBLL (T/U/L/Pi = 320 algs) for 80% of benefit.':
      'تعلّم ZBLL الكاملة التزام يستغرق 6-12 شهرًا. ويكتفي معظم المحلّبين بـCOLL + مجموعة جزئية منها (T/U/L/Pi = 320 خوارزمية) للحصول على 80% من الفائدة.',
    'Competition Mastery': 'إتقان المنافسات',
    'From practice room to main stage. Regulations, nerves, hardware, and routine.':
      'من غرفة التدريب إلى المسرح الرئيسي. اللوائح والأعصاب والمعدات والروتين.',
    'Regulations': 'اللوائح',
    'WCA Regulations (Article 3-4)': 'لوائح WCA (البندان 3-4)',
    'Inspection: 15 seconds max': 'المعاينة: 15 ثانية كحد أقصى',
    'Timer: Stackmat Gen 4/5': 'المؤقّت: ستاك‌مات الجيل 4/5',
    'Hardware': 'المعدات',
    'Flagship: GAN 14, MoYu WeiLong V10': 'الراية: GAN 14 وMoYu WeiLong V10',
    'Budget: RS3M V5, Tornado V3': 'الاقتصادية: RS3M V5 وTornado V3',
    'Lube: Weight 1-5 + DNM-37': 'التزييت: Weight 1-5 + DNM-37',
    'Tension: Even, slight corner cut': 'الشد: متوازن مع قطع زوايا طفيف',
    'Mental Game': 'اللعبة الذهنية',
    'Pre-solve routine (3 breaths)': 'روتين ما قبل الحل (3 شهقات)',
    'Focus on process, not time': 'ركّز على الأداء لا الوقت',
    'Treat comp like practice': 'عامل المنافسة كتدريب',
    'Log every solve, review weekly': 'سجّل كل حل وراجع أسبوعيًا',
    'You\'ve Reached the Summit': 'لقد بلغت القمة',
    'From cube parts to 493 ZBLL algorithms. The journey never ends — there\'s always a faster turn, a better commutator, a cleaner solve. Keep cubing.':
      'من أجزاء المكعب إلى 493 خوارزمية ZBLL. الرحلة لا تنتهي — فدائمًا هناك دوران أسرع ومبادلة أفضل وحل أنقى. واصل التجميع.',
    'Back to Home': 'العودة للرئيسية',

    /* ===================== LEGACY — main.html ===================== */
    'Home': 'الرئيسية',
    'Shop': 'المتجر',
    '⚙️Settings': '⚙️الإعدادات',
    'More Links': 'روابط أخرى',
    'Futures': 'الميزات',
    'team membre': 'فريق العمل',
    'services': 'الخدمات',
    'pricing plan': 'خطط الأسعار',
    'stats': 'الإحصائيات',
    'log in': 'تسجيل الدخول',
    'Enter to Our World': 'ادخل إلى عالمنا',
    'we learn you how to solve cube': 'نعلّمك كيف تحل المكعب',
    'get started': 'ابدأ الآن',
    'what we give to you': 'ماذا نقدم لك',
    'some of our futures': 'بعض مزايانا',
    'we learn you how to become pro from begining.': 'نعلّمك كيف تصبح محترفًا من البداية.',
    'A growing collection of CFOP and Roux.': 'مجموعة متنامية من خوارزميات CFOP وRoux.',
    'A user-friendly dark mode option for better readability.': 'وضع ليلي سهل الاستخدام لقراءة مريحة.',
    'the team member': 'أعضاء الفريق',
    'some of our members': 'بعض أعضائنا',
    'Software Engineer': 'مهندس برمجيات',
    'UI/UX Designer': 'مصمم واجهات وتجربة مستخدم',
    'Project Manager': 'مدير مشاريع',
    'Data Analyst': 'محلل بيانات',
    'Cybersecurity Specialist': 'أخصائي أمن سيبراني',
    'Marketing Strategist': 'استراتيجي تسويق',
    'AI Engineer': 'مهندس ذكاء اصطناعي',
    'Product Manager': 'مدير منتج',
    'our services': 'خدماتنا',
    'some of our services': 'بعض خدماتنا',
    'Beginner’s Guide': 'دليل المبتدئين',
    'Beginner\u2019s Guide': 'دليل المبتدئين',
    'Advanced Methods': 'الطرق المتقدمة',
    'Speedcubing Training': 'تدريب التجميع السريع',
    'Algorithm Library': 'مكتبة الخوارزميات',
    'One-on-One Coachingy': 'تدريب فردي',
    'Competition Prep': 'الاستعداد للمنافسات',
    'Cube Reviews & Recommendations': 'مراجعات وتوصيات المكعبات',
    'Online Timer & Stats Tracker': 'مؤقّت وتتبع إحصائيات عبر الإنترنت',
    'our plans': 'خططنا',
    'some of our plans': 'بعض خططنا',
    'basic': 'أساسية',
    'advanced': 'متقدمة',
    'professional': 'احترافية',
    'per month': 'شهريًا',
    '10GB HDD Space': 'مساحة 10GB على القرص',
    '5 Email Addresses': '5 عناوين بريد إلكتروني',
    '2 Subdomains': 'نطاقان فرعيان',
    '4 Databases': '4 قواعد بيانات',
    'Basic Support': 'دعم أساسي',
    'choose plan': 'اختر الخطة',
    'most pouplar': 'الأكثر شيوعًا',
    '20GB HDD Space': 'مساحة 20GB على القرص',
    '10 Email Addresses': '10 عناوين بريد إلكتروني',
    '5 Subdomains': '5 نطاقات فرعية',
    '8 Databases': '8 قواعد بيانات',
    'advanced Support': 'دعم متقدم',
    '50GB HDD Space': 'مساحة 50GB على القرص',
    '20 Email Addresses': '20 عنوان بريد إلكتروني',
    '10 Subdomains': '10 نطاقات فرعية',
    '20 Databases': '20 قاعدة بيانات',
    'professional Support': 'دعم احترافي',
    'our stats': 'إحصائياتنا',
    'some of our stats': 'بعض أرقامنا',
    'conturies': 'دول',
    'cubes': 'مكعبات',
    'solvers': 'محلّبون',
    'Competitions': 'منافسة',
    'made by meko': 'صنعه مِيكو',
    'Toggle navigation': 'تبديل التنقل',

    /* ===================== LEGACY — lear.html ===================== */
    'learn': 'تعلَّم',
    'Cube Nation': 'أمة المكعب',
    'The Most Important thing to learn in beginning': 'أهم ما يجب تعلمه في البداية',
    'about cube': 'نبذة عن المكعب',
    'learning about cube': 'تعرَّف على المكعب',
    'first : center pieces': 'أولًا: قطع المراكز',
    'second : edges pieces': 'ثانيًا: قطع الحواف',
    'third : corners pieces': 'ثالثًا: قطع الزوايا',
    'opppsite': 'مقابل',
    'which contains two colors like': 'وتحتوي على لونين مثل',
    'which contains three colors like': 'وتحتوي على ثلاثة ألوان مثل',
    'Next Step': 'الخطوة التالية',
    'white': 'الأبيض',
    'yellow': 'الأصفر',
    'blue': 'الأزرق',
    'green': 'الأخضر',
    'orange': 'البرتقالي',
    'red': 'الأحمر',

    /* ===================== LEGACY — login.html / settings.html ===================== */
    'login': 'تسجيل الدخول',
    'theme:': 'المظهر:',
    'size:': 'الحجم:',
    'small': 'صغير',
    'normal': 'عادي',
    'large': 'كبير',

    /* ===================== LEGACY — main1..5.html (forms) ===================== */
    'step 1': 'الخطوة 1',
    'step 2': 'الخطوة 2',
    'step 3': 'الخطوة 3',
    'step 4': 'الخطوة 4',
    'Your info': 'معلوماتك',
    'Select Plan': 'اختر الخطة',
    'ADD-ONS': 'الإضافات',
    'Summary': 'الملخص',
    'Personal info': 'المعلومات الشخصية',
    'Please provide your name, email address, and phone number.':
      'يُرجى تقديم اسمك وبريدك الإلكتروني ورقم هاتفك.',
    'Name': 'الاسم',
    'Email address': 'البريد الإلكتروني',
    'phone number': 'رقم الهاتف',
    'next step': 'الخطوة التالية',
    'go back': 'رجوع',
    'Select your plan': 'اختر خطتك',
    'You have the option of monthly or yearly billing.': 'لديك خيار الفاتورة الشهرية أو السنوية.',
    'Arcade': 'أركيد',
    'Mo': 'شهر',
    'Monthly': 'شهري',
    'Yearly': 'سنوي',
    'Pick add-ons': 'اختر الإضافات',
    'Add-ons help enhance your gaming experience.': 'تساعدك الإضافات على تحسين تجربتك.',
    'Online service': 'خدمة عبر الإنترنت',
    'Access to multiplayer games': 'وصول إلى الألعاب الجماعية',
    'Larger storage': 'مساحة تخزين أكبر',
    'Extra 1TB of cloud save': '1TB إضافية لحفظ البيانات سحابيًا',
    'Customizable Profile': 'ملخص شخصي قابل للتخصيص',
    'Custom theme on your profile': 'مظهر مخصص لملفك الشخصي',
    'Finishing up': 'اللمسات الأخيرة',
    'Double-check everything looks OK before confirming.': 'تأكد من أن كل شيء على ما يرام قبل التأكيد.',
    'confirm': 'تأكيد',
    'Thank you': 'شكرًا لك',
    'Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com.':
      'شكرًا لتأكيد اشتراكك! نتمنى لك وقتًا ممتعًا على منصتنا. وإذا احتجت الدعم فتواصل معنا عبر support@loremgaming.com.',
    '2 months free': 'شهران مجانًا',

    /* ===================== DYNAMIC UI (injected by JS) ===================== */
    'Display': 'عرض الحالة',
    'Play': 'تشغيل',
    'Replay': 'إعادة التشغيل',
    'Playing...': 'قيد التشغيل...',
    'easy': 'سهل',
    'medium': 'متوسط',
    'hard': 'صعب',
    'Added To cart': 'أُضيف إلى السلة',
    'Added to cart': 'أُضيف إلى السلة',

    /* ---------- F2L case names ---------- */
    'Case 1: Basic Insert': 'الحالة 1: إدخال أساسي',
    'Case 2: Mirror of 1': 'الحالة 2: معكوس الحالة 1',
    'Case 3: Basic Insert (alt)': 'الحالة 3: إدخال أساسي (بديل)',
    'Case 4: Mirror of 3': 'الحالة 4: معكوس الحالة 3',
    'Case 5: Split Pair': 'الحالة 5: زوج منفصل',
    'Case 6: Mirror of 5': 'الحالة 6: معكوس الحالة 5',
    'Case 7: Connected Pair': 'الحالة 7: زوج متصل',
    'Case 8: Mirror of 7': 'الحالة 8: معكوس الحالة 7',
    'Case 9: Simple Case': 'الحالة 9: حالة بسيطة',
    'Case 10: Mirror of 9': 'الحالة 10: معكوس الحالة 9',
    'Case 11: Keyhole-ish': 'الحالة 11: شبه ثقب مفتاحي',
    'Case 12: Mirror of 11': 'الحالة 12: معكوس الحالة 11',
    'Multi-Slot 1': 'فتحات متعددة 1',
    'Multi-Slot 2': 'فتحات متعددة 2',
    'Keyhole Insert': 'إدخال الثقب المفتاحي',
    'Keyhole with Edge': 'ثقب مفتاحي مع حافة',
    'Corner Only': 'الزاوية فقط',
    'Edge Only': 'الحافة فقط',

    /* ---------- OLL 2-look names ---------- */
    'Dot → Cross': 'نقطة ← صليب',
    'Line → Cross': 'خط ← صليب',
    'L → Cross': 'L ← صليب',
    'U / Headlights': 'U / مصابيح أمامية',
    'L / Bowtie': 'L / ربطة عنق',
    'Pi / Air Jeff': 'Pi / إير جيف',
    'No Corners 1': 'بدون زوايا 1',
    'No Corners 2': 'بدون زوايا 2',
    'No Corners 3': 'بدون زوايا 3',
    'No Corners 4': 'بدون زوايا 4',
    'Kite 1': 'طائرة ورقية 1',
    'Kite 2': 'طائرة ورقية 2',
    'Square 1': 'مربع 1', 'Square 2': 'مربع 2', 'Square 3': 'مربع 3', 'Square 4': 'مربع 4',
    'Awkward 1': 'الحرج 1', 'Awkward 2': 'الحرج 2', 'Awkward 3': 'الحرج 3', 'Awkward 4': 'الحرج 4',
    'Fish 1': 'السمكة 1', 'Fish 2': 'السمكة 2', 'Fish 3': 'السمكة 3', 'Fish 4': 'السمكة 4',
    'Knight 1': 'الفارس 1', 'Knight 2': 'الفارس 2', 'Knight 3': 'الفارس 3', 'Knight 4': 'الفارس 4',

    /* ---------- F2L / data descriptions ---------- */
    'Corner on top, edge on top, paired correctly': 'الزاوية في الأعلى والحافة في الأعلى، مقرونان بشكل صحيح',
    'Mirror of Case 1 for left slot': 'معكوس الحالة 1 للفتحة اليسرى',
    'Corner and edge already paired, just insert': 'الزاوية والحافة مقرونان مسبقًا، فقط أدخلهما',
    'Mirror of Case 3 for left slot': 'معكوس الحالة 3 للفتحة اليسرى',
    'Corner and edge separated, simple insert': 'الزاوية والحافة منفصلان، إدخال بسيط',
    'Mirror of Case 5': 'معكوس الحالة 5',
    'Corner and edge connected on top': 'الزاوية والحافة متصلان في الأعلى',
    'Mirror of Case 7': 'معكوس الحالة 7',
    'Two-gen insert with setup': 'إدخال بحركتين مع تجهيز',
    'Mirror of Case 9': 'معكوس الحالة 9',
    'Corner on top with edge in slot': 'الزاوية في الأعلى والحافة في الفتحة',
    'Mirror of Case 11': 'معكوس الحالة 11',
    'Corner on top, edge in wrong place': 'الزاوية في الأعلى والحافة في المكان الخطأ',
    'Corner pointing up, edge on top': 'الزاوية تشير لأعلى والحافة في الأعلى',
    'Corner on top, edge in middle layer': 'الزاوية في الأعلى والحافة في الطبقة الوسطى',
    'Corner on top, edge in slot but flipped': 'الزاوية في الأعلى والحافة في الفتحة لكن مقلوبة',
    'Corner in slot, edge on top': 'الزاوية في الفتحة والحافة في الأعلى',
    'Corner on top, edge in U layer': 'الزاوية في الأعلى والحافة في الطبقة U',
    'Difficult case, corner twisted': 'حالة صعبة، الزاوية ملتوية',
    'Corner on top, edge in D layer': 'الزاوية في الأعلى والحافة في الطبقة D',
    'Complex insertion with setup': 'إدخال معقد مع تجهيز',
    'Corner in D layer, edge on top': 'الزاوية في الطبقة D والحافة في الأعلى',
    'Both pieces in U layer, separated': 'القطعتان في الطبقة U ومنفصلتان',
    'Uses F move for efficiency': 'يستخدم حركة F لمزيد من الكفاءة',
    'Corner on top, edge in middle': 'الزاوية في الأعلى والحافة في المنتصف',
    'Complex multi-step case': 'حالة معقدة متعددة الخطوات',
    'Corner twisted in place': 'الزاوية ملتوية في مكانها',
    'Solve two pairs simultaneously': 'حل زوجين في آن واحد',
    'Insert pair while setting up next': 'أدخل الزوج مع تجهيز الزوج التالي',
    'Use empty slot as keyhole': 'استخدم الفتحة الفارغة كثقب مفتاحي',
    'Keyhole with edge already in place': 'ثقب مفتاحي والحافة في مكانها مسبقًا',
    'Corner twisted, edge already solved': 'الزاوية ملتوية والحافة محلولة مسبقًا',
    'Edge in wrong slot, corner solved': 'الحافة في الفتحة الخطأ والزاوية محلولة',
    'No edges oriented': 'لا حواف موجّهة',
    'Two opposite edges oriented': 'حافتان متقابلتان موجّهتان',
    'Two adjacent edges oriented': 'حافتان متجاورتان موجّهتان',
    '3 corners need orientation (OLL 27)': '3 زوايا تحتاج توجيهًا (OLL 27)',
    '3 corners, mirror of Sune (OLL 26)': '3 زوايا، معكوس سوني (OLL 26)',
    '2 corners adjacent (OLL 21-22)': 'زاويتان متجاورتان (OLL 21-22)',
    '2 corners opposite (OLL 23-24)': 'زاويتان متقابلتان (OLL 23-24)',
    '2 corners, L-shape (OLL 49-50)': 'زاويتان بشكل L (OLL 49-50)',
    'No corners oriented (OLL 35-36)': 'لا زوايا موجّهة (OLL 35-36)',
    '2 corners opposite, 2 oriented (OLL 25)': 'زاويتان متقابلتان وزاويتان موجّهتان (OLL 25)',
    'Cycle 3 edges clockwise': 'تدوير 3 حواف مع عقارب الساعة',
    'Cycle 3 edges counter-clockwise': 'تدوير 3 حواف عكس عقارب الساعة',
    'Swap opposite edges': 'تبديل الحافتين المتقابلتين',
    'Swap adjacent edges': 'تبديل الحافتين المتجاورتين',
    'Cycle 3 corners clockwise': 'تدوير 3 زوايا مع عقارب الساعة',
    'Cycle 3 corners counter-clockwise': 'تدوير 3 زوايا عكس عقارب الساعة',
    'Swap opposite corners + edges': 'تبديل الزوايا المتقابلة + الحواف',
    'Swap adjacent corners + edges': 'تبديل الزوايا المتجاورة + الحواف',
    'Swap 2 corners + 2 edges (J perm)': 'تبديل زاويتين + حافتين (تصفية J)',
    'Swap diagonal corners + edges': 'تبديل الزوايا المتقابلة قطريًا + الحواف',
    'G perm variant A': 'صيغة A من تصفية G',
    'G perm variant B': 'صيغة B من تصفية G',
    'G perm variant C': 'صيغة C من تصفية G',
    'G perm variant D': 'صيغة D من تصفية G',
    'Swap 2 corners + 2 edges (T shape)': 'تبديل زاويتين + حافتين (شكل T)',
    'Swap 2 corners + 2 edges (J perm mirror)': 'تبديل زاويتين + حافتين (معكوس تصفية J)',
    'Swap 2 corners + 2 edges (R perm)': 'تبديل زاويتين + حافتين (تصفية R)',
    'Swap 2 corners + 2 edges (R perm mirror)': 'تبديل زاويتين + حافتين (معكوس تصفية R)',
    'Swap 2 corners + 2 edges (V shape)': 'تبديل زاويتين + حافتين (شكل V)',
    'N perm variant A': 'صيغة A من تصفية N',

    /* ---------- Finger tricks / OH / BLD names ---------- */
    'Double Flick (R U)': 'النقرة المزدوجة (R U)',
    'Reverse Sexy': 'السحريه العكسية',
    'Air Jeff / Pi Trigger': 'إير جيف / زناد باي',
    'T Perm Finger Trick': 'حيلة تصفية T',
    'J Perm (Ja) Flow': 'انسجام تصفية J (Ja)',
    'Y Perm Execution': 'تنفيذ تصفية Y',
    'V Perm Finger Trick': 'حيلة تصفية V',
    'E Perm OH Style': 'تصفية E بأسلوب OH',
    'Z Perm Optimization': 'تحسين تصفية Z',
    'G Perm (Ga) Flow': 'انسجام تصفية G (Ga)',
    'OLL 27 (Sune) Optimized': 'OLL 27 (سوني) محسّنة',
    'OLL 26 (Anti-Sune) Optimized': 'OLL 26 (أنتي-سوني) محسّنة',
    'PLL Ua Perm': 'تصفية Ua (PLL)',
    'PLL Ub Perm': 'تصفية Ub (PLL)',
    'PLL H Perm': 'تصفية H (PLL)',
    'PLL Z Perm': 'تصفية Z (PLL)',
    'OH F2L Case 1': 'حالة F2L بيد واحدة 1',
    'OH F2L Case 2': 'حالة F2L بيد واحدة 2',
    'OH F2L Case 3': 'حالة F2L بيد واحدة 3',
    'OH F2L Case 4': 'حالة F2L بيد واحدة 4',
    'OH F2L Case 5': 'حالة F2L بيد واحدة 5',
    'OH F2L Case 6 (Mirror)': 'حالة F2L بيد واحدة 6 (معكوسة)',
    'OH F2L Multi-Slot': 'فتحات متعددة بيد واحدة',
    'OH Keyhole': 'الثقب المفتاحي بيد واحدة',
    'OH OLL 27 (Sune)': 'OLL 27 بيد واحدة (سوني)',
    'OH OLL 26 (Anti-Sune)': 'OLL 26 بيد واحدة (أنتي-سوني)',
    'OH OLL 21 (U-shape)': 'OLL 21 بيد واحدة (شكل U)',
    'OH OLL 23 (T-shape)': 'OLL 23 بيد واحدة (شكل T)',
    'OH PLL Ua': 'PLL بيد واحدة Ua',
    'OH PLL Ub': 'PLL بيد واحدة Ub',
    'OH PLL H': 'PLL بيد واحدة H',
    'OH PLL Z': 'PLL بيد واحدة Z',
    'M2 Setup: UF→UB': 'تجهيز M2: UF←UB',
    'M2 Setup: UF→UL': 'تجهيز M2: UF←UL',
    'M2 Setup: UF→UR': 'تجهيز M2: UF←UR',
    'M2 Setup: UF→DF': 'تجهيز M2: UF←DF',
    'M2 Setup: UF→DL': 'تجهيز M2: UF←DL',
    'M2 Setup: UF→DR': 'تجهيز M2: UF←DR',
    'M2 Setup: UF→DB': 'تجهيز M2: UF←DB',
    '3-Style Edge Comm: UF-UB-UL': 'مبادلة حواف 3-Style: UF-UB-UL',
    '3-Style Edge Comm: UF-UR-UF': 'مبادلة حواف 3-Style: UF-UR-UF',
    '3-Style Edge Comm: UF-DF-DB': 'مبادلة حواف 3-Style: UF-DF-DB',
    'Parity Fix (M2)': 'تصحيح التماثل الشاذ (M2)',
    'OP Corner Swap (T-Perm)': 'تبديل زوايا OP (تصفية T)',
    'OP Setup: UBL→UBR': 'تجهيز OP: UBL←UBR',
    'OP Setup: UBL→UFL': 'تجهيز OP: UBL←UFL',
    'OP Setup: UBL→UFR': 'تجهيز OP: UBL←UFR',
    'OP Setup: UBL→DFL': 'تجهيز OP: UBL←DFL',
    'OP Setup: UBL→DBR': 'تجهيز OP: UBL←DBR',
    '3-Style Corner Comm: UBL-UBR-UFL': 'مبادلة زوايا 3-Style: UBL-UBR-UFL',
    '3-Style Corner Comm: UBL-UFL-UBR': 'مبادلة زوايا 3-Style: UBL-UFL-UBR',
    '3-Style Corner Comm: UBL-DFR-DBR': 'مبادلة زوايا 3-Style: UBL-DFR-DBR',
    'Parity Fix (OP)': 'تصحيح التماثل الشاذ (OP)',
    'Speffz Letter Scheme': 'مخطط حروف Speffz',
    'Audio Pair: AB': 'زوج صوتي: AB',
    'Journey Location 1': 'موقع الرحلة 1',
    'Journey Location 2': 'موقع الرحلة 2',
    'Sune 1 (OLL 27)': 'سوني 1 (OLL 27)',
    'Anti-Sune 1 (OLL 26)': 'أنتي-سوني 1 (OLL 26)',
    'Pi 1 (OLL 35)': 'باي 1 (OLL 35)',
    'H 1 (OLL 25)': 'H 1 (OLL 25)',
    'T 1 (OLL 23)': 'T 1 (OLL 23)',
    'L 1 (OLL 49)': 'L 1 (OLL 49)',

    /* ---------- Finger tricks / OH / BLD descriptions ---------- */
    'Index finger push for R, pull for R\'. Keep wrist stable.': 'دفع بالسبابة لـ R وسحب لـ R\'. أبقِ الرسغ ثابتًا.',
    'Index for U, middle for U\'. Flick, don\'t push.': 'السبابة لـ U والوسطى لـ U\'. نقرة لا دفع.',
    'Index finger push for F. Rotate wrist slightly.': 'دفع بالسبابة لـ F مع تدوير بسيط للرسغ.',
    'Ring for L, middle for L\'. Mirror of R moves.': 'البنصر لـ L والوسطى لـ L\'. صورة معكوسة لحركات R.',
    'Index does R then immediately U in one motion.': 'السبابة تنفّذ R ثم فورًا U في حركة واحدة.',
    'Ring finger R\', index F, ring R, index F\'. Flow as one.': 'البنصر لـ R\' والسبابة لـ F والبنصر لـ R والسبابة لـ F\'. انساب ككتلة واحدة.',
    'Index R, index U, index R\', index U\'. The foundation.': 'السبابة لـ R ثم U ثم R\' ثم U\'. هذا هو الأساس.',
    'Index U, index R, index U\', index R\'. Mirror flow.': 'السبابة لـ U ثم R ثم U\' ثم R\'. انسجام معكوس.',
    'R U2 with index, R2 with ring+middle, U\' with middle...': '‏R U2 بالسبابة، وR2 بالبنصر+الوسطى، وU\' بالوسطى...',
    'Regripless T perm. R U R\' U\' (sexy), R\' F (sledge), R2 U\' R\' U\' R U R\' F\'.':
      'تصفية T دون إعادة قبضة. ‏R U R\' U\' (سيكسي)، وR\' F (سليدج)، وR2 U\' R\' U\' R U R\' F\'.',
    'Ring R\', index U, thumb L\', index U2, index R...': 'البنصر لـ R\' والسبابة لـ U والإبهام لـ L\' والسبابة لـ U2 ثم R...',
    'F (index), R U\' R\' U\' (reverse sexy), R U R\' F\'...': '‏F (بالسبابة)، وR U\' R\' U\' (سيكسي عكسية)، وR U R\' F\'...',
    'All ring/middle fingers. No regrips. Pure flow.': 'بالبنصر/الوسطى فقط. دون إعادة قبضة. انسياب خالص.',
    'Table abuse for D turns. Wrist rotation replaces regrips.': 'الاستعانة بالطاولة لدورانات D. دوران الرسغ يغني عن إعادة القبضة.',
    'Ring for M2, middle for M\'. Ring finger M2 U M2...': 'البنصر لـ M2 والوسطى لـ M\'. البنصر ينفّذ M2 U M2...',
    'R2 (ring+middle), U (index), R\' (ring), U\' (middle)...': '‏R2 (بالبنصر+الوسطى)، وU (بالسبابة)، وR\' (بالبنصر)، وU\' (بالوسطى)...',
    'Index R, index U, ring R\', index U, index R, index U2 (double flick), ring R\'.':
      'السبابة لـ R ثم U، والبنصر لـ R\'، والسبابة لـ U ثم R، وU2 بنقرة مزدوجة، ثم R\' بالبنصر.',
    'Index R, index U2, ring R\', middle U\', index R, middle U\', ring R\'.':
      'السبابة لـ R ثم U2، والبنصر لـ R\'، والوسطى لـ U\'، والسبابة لـ R، والوسطى لـ U\'، ثم R\' بالبنصر.',
    'Index R, middle U\', index R, index U, index R, index U, ring R\', middle U\', middle U\', ring+middle R2.':
      'السبابة لـ R، والوسطى لـ U\'، والسبابة لـ R ثم U ثم R ثم U، والبنصر لـ R\'، والوسطى لـ U\' مرتين، وR2 بالبنصر+الوسطى.',
    'Ring+middle R2, index U, index R, index U, ring R\', middle U\', middle U\', ring R\', middle U, ring R\'.':
      '‏R2 بالبنصر+الوسطى، والسبابة لـ U ثم R ثم U، والبنصر لـ R\'، والوسطى لـ U\' مرتين، والبنصر لـ R\'، والوسطى لـ U، ثم R\' بالبنصر.',
    'Ring M2, index U, ring M2, index U2, ring M2, index U, ring M2. All ring finger.':
      '‏M2 بالبنصر، وU بالسبابة، وM2 بالبنصر، وU2 بالسبابة، وM2 بالبنصر، وU بالسبابة، وM2 بالبنصر. كلها بالبنصر.',
    'Ring M2, index U, ring M2, index U, middle M\', index U2...': '‏M2 بالبنصر، وU بالسبابة، وM2 بالبنصر، وU بالسبابة، وM\' بالوسطى، وU2 بالسبابة...',
    'Index R, index U, ring R\'. The most basic insert.': 'السبابة لـ R ثم U، والبنصر لـ R\'. أكثر عمليات الإدخال بساطة.',
    'Middle U\', index F\', middle U, index F. Left hand mirror.': 'الوسطى لـ U\'، والسبابة لـ F\'، والوسطى لـ U، والسبابة لـ F. صورة يسارية معكوسة.',
    'Pinky pushes R, ring pulls R\'. Wrist rotates for U/U\'.': 'الخنصر يدفع R والبنصر يسحب R\'. ويتدحرج الرسغ لتنفيذ U/U\'.',
    'Index flicks U, middle flicks U\'. Wrist stable.': 'السبابة تنقر U والوسطى تنقر U\'. مع رسغ ثابت.',
    'Index pushes F, thumb pulls F\'. Cube on table for stability.': 'السبابة تدفع F والإبهام يسحب F\'. والمكعب على الطاولة للاستقرار.',
    'Ring pushes L, pinky pulls L\'. Awkward, avoid when possible.': 'البنصر يدفع L والخنصر يسحب L\'. حركة متعبة، تجنّبها إن أمكن.',
    'Push cube against table, rotate wrist for D/D\'. No finger effort.': 'اضغط المكعب على الطاولة ودوّر الرسغ لتنفيذ D/D\'. بلا جهد من الأصابع.',
    'Rotate entire wrist. Cube stays on table. Rarely used in OH.': 'دوّر الرسغ بالكامل مع بقاء المكعب على الطاولة. نادر الاستخدام في OH.',
    'Ring finger pushes M slice. Table stabilizes cube.': 'البنصر يدفع شريحة M. والطاولة تثبّت المكعب.',
    'Index pushes S slice. Very rare in OH solves.': 'السبابة تدفع شريحة S. نادرة جدًا في حلول OH.',
    'Pinky R, index U, ring R\'. Standard right-hand insert.': 'الخنصر لـ R والسبابة لـ U والبنصر لـ R\'. إدخال اليد اليمنى المعياري.',
    'Middle U\', pinky R, index U, ring R\'. Setup + insert.': 'الوسطى لـ U\' والخنصر لـ R والسبابة لـ U والبنصر لـ R\'. تجهيز + إدخال.',
    'Pinky R, middle U\', ring R\'. Connected pair.': 'الخنصر لـ R والوسطى لـ U\' والبنصر لـ R\'. زوج متصل.',
    'Pinky R, index U2 (double), ring R\', middle U\', pinky R, index U, ring R\'.':
      'الخنصر لـ R، والسبابة لـ U2 (مزدوجة)، والبنصر لـ R\'، والوسطى لـ U\'، والخنصر لـ R، والسبابة لـ U، ثم R\' بالبنصر.',
    'Index U, pinky R, middle U\', ring R\', index U, pinky R, middle U\', ring R\'.':
      'السبابة لـ U، والخنصر لـ R، والوسطى لـ U\'، والبنصر لـ R\'، والسبابة لـ U، والخنصر لـ R، والوسطى لـ U\'، ثم R\' بالبنصر.',
    'Middle U\', ring L\', index U, pinky L. Left slot, awkward.': 'الوسطى لـ U\'، والبنصر لـ L\'، والسبابة لـ U، والخنصر لـ L. فتحة يسرى متعبة.',
    'Insert first pair while setting up second. Pinky/index/ring flow.':
      'أدخل الزوج الأول مع تجهيز الثاني. انسياب خنصر/سبابة/بنصر.',
    'Use empty slot. Pinky R, index U, ring R\'. Fast and efficient.':
      'استخدم الفتحة الفارغة. الخنصر لـ R والسبابة لـ U والبنصر لـ R\'. سريع وفعال.',
    'Long but flowy. Pinky/index/ring alternating.': 'طويلة لكن انسيابية. بالتناوب بين الخنصر/السبابة/البنصر.',
    'r = R + M (pinky+ring). F with index. Complex.': '‏r = R + M (بالخنصر+البنصر). وF بالسبابة. معقدة.',
    'Standard Ua. Pinky R, middle U\', pinky R, index U...': '‏Ua المعيارية. الخنصر لـ R، والوسطى لـ U\'، والخنصر لـ R، والسبابة لـ U...',
    'Best OH PLL. All ring finger M2. Very fast.': 'أفضل PLL بيد واحدة. كل M2 بالبنصر. سريعة جدًا.',
    'Core of M2 method. Swap UF (buffer) with target edge.': 'جوهر طريقة M2. بدّل UF (المرجعية) بالحافة المستهدفة.',
    'Setup UB to UF, M2, undo setup.': 'جهّز UB إلى UF، ثم M2، ثم تراجع عن التجهيز.',
    'Setup UL to UF via L\'.': 'جهّز UL إلى UF عبر L\'.',
    'Setup UR to UF via R.': 'جهّز UR إلى UF عبر R.',
    'Setup DF to UF via D.': 'جهّز DF إلى UF عبر D.',
    'Double setup for DL.': 'تجهيز مزدوج لـ DL.',
    'Double setup for DR.': 'تجهيز مزدوج لـ DR.',
    'Double setup for DB.': 'تجهيز مزدوج لـ DB.',
    'Commutator [M\', U] = M\' U M U\'. 3-cycle edges.': 'مبادلة [M\', U] = M\' U M U\'. دوران ثلاثي للحواف.',
    'Commutator [U\', M\'] = U\' M\' U M. 3-cycle.': 'مبادلة [U\', M\'] = U\' M\' U M. دوران ثلاثي.',
    'Commutator [D, M\'] = D M\' D\' M.': 'مبادلة [D, M\'] = D M\' D\' M.',
    'Fix parity when odd number of edge targets.': 'صحّح التماثل الشاذ عند وجود عدد فردي من أهداف الحواف.',
    'Old Pochmann corner swap. Buffer UBL ↔ target.': 'تبديل زوايا أولد بوشمان. المرجعية UBL ↔ الهدف.',
    'T-perm swaps UBL↔UBR directly. No setup needed.': 'تصفية T تبدّل UBL↔UBR مباشرة. دون حاجة لتجهيز.',
    'F\' setup, T-perm, F undo. Swaps UBL↔UFL.': 'تجهيز F\' ثم تصفية T ثم تراجع بـ F. تبدّل UBL↔UFL.',
    'R\' F setup, T-perm, F\' R undo.': 'تجهيز R\' F ثم تصفية T ثم تراجع بـ F\' R.',
    'D2 F\' setup, T-perm, F D2 undo.': 'تجهيز D2 F\' ثم تصفية T ثم تراجع بـ F D2.',
    'D\' F\' setup, T-perm, F D undo.': 'تجهيز D\' F\' ثم تصفية T ثم تراجع بـ F D.',
    '[R U\' R\' U\', R U R\' F\'] = T-perm commutator.': '‏[R U\' R\' U\', R U R\' F\'] = مبادلة تصفية T.',
    '[R U R\' F\', R U R\' U\'] = J-perm commutator.': '‏[R U R\' F\', R U R\' U\'] = مبادلة تصفية J.',
    '[D, R U\' R\'] = D R U\' R\' D\' R U R\'. Simple 3-cycle.': '‏[D, R U\' R\'] = D R U\' R\' D\' R U R\'. دوران ثلاثي بسيط.',
    'T-perm fixes corner parity when odd edge targets.': 'تصفية T تصحّح تماثل الزوايا الشاذ عند وجود أهداف حواف فردية.',
    'UBL=A, UBR=B, UFL=C, UFR=D, UL=E, UR=F, UF=G, UB=H...': '‏UBL=A وUBR=B وUFL=C وUFR=D وUL=E وUR=F وUF=G وUB=H...',
    '"Apple Butterfly" → vivid image. Speak rhythmically.': '«Apple Butterfly» ← صورة حية. انطقها بإيقاع.',
    'Place "Apple Butterfly Cat Dog" at front door.': 'ضع «Apple Butterfly Cat Dog» عند الباب المدخل.',
    '"Elephant Fish Goat Hat" at shoe rack.': '«Elephant Fish Goat Hat» عند رف الأحذية.',
    'Standard Sune. Corners solved, edges cycled.': 'سوني المعيارية. الزوايا محلولة والحواف مدورة.',
    'Sune variation. UBL→UBR→UFL.': 'صيغة من سوني. UBL←UBR←UFL.',
    'Sune with extra setup. UBL→UFL→UBR.': 'سوني مع تجهيز إضافي. UBL←UFL←UBR.',
    'Standard Anti-Sune. Mirror of Sune.': 'أنتي-سوني المعيارية. معكوس سوني.',
    'Anti-Sune variation. UBR→UBL→UFL.': 'صيغة من أنتي-سوني. UBR←UBL←UFL.',
    'Anti-Sune extended. UBR→UFL→UBL.': 'أنتي-سوني موسعة. UBR←UFL←UBL.',
    'Pi case. No corners oriented. UBL→UBR→UFL→UFR.': 'حالة باي. لا زوايا موجّهة. UBL←UBR←UFL←UFR.',
    'Pi mirror. Opposite corner cycle.': 'معكوس باي. دوران زوايا متقابل.',
    'Pi with adjacent swap.': 'باي مع تبديل متجاور.',
    'Pi inverse pattern.': 'نمط باي معكوس.',
    'Pi with headlights.': 'باي مع مصابيح أمامية.',
    'Pi mirror with headlights.': 'معكوس باي مع مصابيح أمامية.',
    'H case. Two opposite corners need swap.': 'حالة H. زاويتان متقابلتان تحتاجان تبديلًا.',
    'H variation. Different corner cycle.': 'صيغة من H. دوران زوايا مختلف.',
    'H mirror.': 'معكوس H.',
    'H with double swap.': 'H مع تبديل مزدوج.',
    'U case (headlights). Adjacent corner swap.': 'حالة U (مصابيح أمامية). تبديل زاويتين متجاورتين.',
    'U mirror.': 'معكوس U.',
    'U with edges oriented. Simple.': 'U مع حواف موجّهة. بسيطة.',
    'U variation.': 'صيغة من U.',
    'T case. Diagonal corner swap.': 'حالة T. تبديل زاويتين قطريًا.',
    'T mirror.': 'معكوس T.',
    'T with edges oriented.': 'T مع حواف موجّهة.',
    'T variation.': 'صيغة من T.',
    'L case (bowtie). Adjacent swap.': 'حالة L (ربطة عنق). تبديل متجاور.',
    'L mirror.': 'معكوس L.',
    'L variation.': 'صيغة من L.',
    'L inverse.': 'L معكوس.',
    'C case. Corner 3-cycle.': 'حالة C. دوران ثلاثي للزوايا.',
    'C mirror.': 'معكوس C.',
    'W case. Complex cycle.': 'حالة W. دوران معقد.',
    'W mirror.': 'معكوس W.',
    'Knight move pattern.': 'نمط حركة الفارس.',
    'Knight mirror.': 'معكوس الفارس.',
    'Awkward shape.': 'شكل حرج.',
    'Awkward mirror.': 'الحرج معكوس.',
    'Fish shape.': 'شكل السمكة.',
    'Fish mirror.': 'السمكة معكوسة.',
    'T-set, UL edge, left block.': 'مجموعة T، حافة UL، كتلة يسرى.',
    'T-set, UR edge, right block.': 'مجموعة T، حافة UR، كتلة يمنى.',
    'T-set, FR edge.': 'مجموعة T، حافة FR.',
    'T-set, FL edge.': 'مجموعة T، حافة FL.',
    'U-set, UL edge.': 'مجموعة U، حافة UL.',
    'U-set, UR edge.': 'مجموعة U، حافة UR.',
    'L-set, UL edge.': 'مجموعة L، حافة UL.',
    'L-set, UR edge.': 'مجموعة L، حافة UR.',
    'Pi-set, UL edge.': 'مجموعة Pi، حافة UL.',
    'Pi-set, UR edge.': 'مجموعة Pi، حافة UR.',
    'H-set. Pure M-slice. Very fast.': 'مجموعة H. شريحة M خالصة. سريعة جدًا.',
    'H-set variation.': 'صيغة من مجموعة H.',
    'Sune ZBLL. Edges permuted.': 'سوني ضمن ZBLL. الحواف مرتّبة.',
    'Anti-Sune ZBLL.': 'أنتي-سوني ضمن ZBLL.',

    /* ---------- Late additions (finger-trick names with notation, etc.) ---------- */
    'R / R\' (Index)': '‏R / R\' (بالسبابة)',
    'U / U\' (Index/Middle)': '‏U / U\' (بالسبابة/الوسطى)',
    'F / F\' (Index)': '‏F / F\' (بالسبابة)',
    'L / L\' (Middle/Ring)': '‏L / L\' (بالوسطى/البنصر)',
    'R / R\' (Pinky/Ring)': '‏R / R\' (بالخنصر/البنصر)',
    'F / F\' (Index/Thumb)': '‏F / F\' (بالسبابة/الإبهام)',
    'L / L\' (Ring/Pinky)': '‏L / L\' (بالبنصر/الخنصر)',
    'D / D\' (Table Abuse)': '‏D / D\' (بالاستعانة بالطاولة)',
    'B / B\' (Wrist Rotation)': '‏B / B\' (بدوران الرسغ)',
    'M / M\' (Ring)': '‏M / M\' (بالبنصر)',
    'S / S\' (Index)': '‏S / S\' (بالسبابة)',
    'F2L Case 1 (R U R\')': 'حالة F2L 1 (R U R\')',
    'F2L Case 2 (U\' F\' U F)': 'حالة F2L 2 (U\' F\' U F)',
    'Pinky R, index U, ring R\', index U, pinky R, index U2, ring R\'.':
      'الخنصر لـ R، والسبابة لـ U، والبنصر لـ R\'، والسبابة لـ U، والخنصر لـ R، وU2 بالسبابة، ثم R\' بالبنصر.',
    'Pinky R, index U2, ring R\', middle U\', pinky R, middle U\', ring R\'.':
      'الخنصر لـ R، والسبابة لـ U2، والبنصر لـ R\'، والوسطى لـ U\'، والخنصر لـ R، والوسطى لـ U\'، ثم R\' بالبنصر.',
    'Ring+middle R2, index U, pinky R, index U, ring R\', middle U\'...':
      '‏R2 بالبنصر+الوسطى، والسبابة لـ U، والخنصر لـ R، والسبابة لـ U، والبنصر لـ R\'، والوسطى لـ U\'...',
    'No corners oriented.': 'لا زوايا موجّهة.',
    'No corners oriented mirror.': 'لا زوايا موجّهة — معكوس.',
  };

  /* Attribute dictionaries keyed by attribute name */
  var AR_ATTR = {
    'aria-label': {
      'Cubit — Home': 'Cubit — الرئيسية',
      'Toggle theme': 'تبديل المظهر',
      'Interactive 3D Rubik\'s Cube': 'مكعب روبيك تفاعلي ثلاثي الأبعاد',
      'Animated Rubik\'s Cube': 'مكعب روبيك متحرك',
      'Footer navigation': 'تنقّل التذييل',
      'Main navigation': 'التنقل الرئيسي',
      'Learning progress': 'تقدّم التعلم',
      'Face turn controls': 'أزرار دوران الوجوه',
      'Whole-cube rotation controls (x / y / z)': 'أزرار تدوير المكعب كاملًا (x / y / z)',
      'Scramble cube': 'اخلط المكعب',
      'Reset cube to solved': 'أعد المكعب إلى حالته المحلولة',
      'Daisy step visualization': 'عرض خطوة الأقحوانة',
      'White Cross step visualization': 'عرض خطوة الصليب الأبيض',
      'White Corners step visualization': 'عرض خطوة الزوايا البيضاء',
      'Second Layer step visualization': 'عرض خطوة الطبقة الثانية',
      'Yellow Cross step visualization': 'عرض خطوة الصليب الأصفر',
      'Solve step visualization': 'عرض خطوة إكمال الحل',
      'Search algorithms across F2L, OLL and PLL': 'ابحث في خوارزميات F2L وOLL وPLL',
      'Cross example visualization': 'عرض مثال الصليب',
      'F2L case categories': 'تصنيفات حالات F2L',
      'OLL case categories': 'تصنيفات حالات OLL',
      'PLL case categories': 'تصنيفات حالات PLL',
      'Finger trick categories': 'تصنيفات حيل الأصابع',
      'OH categories': 'تصنيفات بيد واحدة',
      'OH basic trigger visualization': 'عرض تفاعلي لحركة OH الأساسية',
      'Blindfolded categories': 'تصنيفات معصوب العينين',
      'BLD commutator example': 'مثال مبادلة BLD',
      'COLL/ZBLL categories': 'تصنيفات COLL/ZBLL',
      'COLL subsets': 'مجموعات COLL الجزئية',
      'Toggle navigation': 'تبديل التنقل',
      'Switch language': 'تبديل اللغة',
      'U — Up face clockwise': 'U — الوجه العلوي مع عقارب الساعة',
      'U\' — Up face counter-clockwise': 'U\' — الوجه العلوي عكس عقارب الساعة',
      'R — Right face clockwise': 'R — الوجه الأيمن مع عقارب الساعة',
      'R\' — Right face counter-clockwise': 'R\' — الوجه الأيمن عكس عقارب الساعة',
      'F — Front face clockwise': 'F — الوجه الأمامي مع عقارب الساعة',
      'F\' — Front face counter-clockwise': 'F\' — الوجه الأمامي عكس عقارب الساعة',
      'L — Left face clockwise': 'L — الوجه الأيسر مع عقارب الساعة',
      'L\' — Left face counter-clockwise': 'L\' — الوجه الأيسر عكس عقارب الساعة',
      'B — Back face clockwise': 'B — الوجه الخلفي مع عقارب الساعة',
      'B\' — Back face counter-clockwise': 'B\' — الوجه الخلفي عكس عقارب الساعة',
      'D — Down face clockwise': 'D — الوجه السفلي مع عقارب الساعة',
      'D\' — Down face counter-clockwise': 'D\' — الوجه السفلي عكس عقارب الساعة',
      'M — Middle slice, follows L': 'M — الشريحة الوسطى، تتبع اتجاه L',
      'M\' — Middle slice, follows L\'': 'M\' — الشريحة الوسطى، تتبع اتجاه L\'',
      'E — Equatorial slice, follows D': 'E — الشريحة الاستوائية، تتبع اتجاه D',
      'E\' — Equatorial slice, follows D\'': 'E\' — الشريحة الاستوائية، تتبع اتجاه D\'',
      'S — Standing slice, follows F': 'S — الشريحة الواقفة، تتبع اتجاه F',
      'S\' — Standing slice, follows F\'': 'S\' — الشريحة الواقفة، تتبع اتجاه F\'',
      'x — rotate entire cube around R/L axis': 'x — تدوير المكعب كاملًا حول محور R/L',
      'y — rotate entire cube around U/D axis': 'y — تدوير المكعب كاملًا حول محور U/D',
      'z — rotate entire cube around F/B axis': 'z — تدوير المكعب كاملًا حول محور F/B',
      'Slice move controls (M / E / S)': 'أزرار حركات الشرائح (M / E / S)',
    },
    'placeholder': {
      'User-Name': 'اسم المستخدم',
      'User-Email': 'البريد الإلكتروني',
      'Password': 'كلمة المرور',
      'e.g. Stephen King': 'مثال: Stephen King',
      'e.g. stephenking@lorem.com': 'مثال: stephenking@lorem.com',
      'e.g. +1 234 567 890': 'مثال: +234 567 890 1',
      'Search algorithms \u2014 e.g. Sune, Ua perm, F2L 21...': 'ابحث عن خوارزمية — مثل Sune أو Ua perm أو F2L 21...',
    },
    'title': {},
  };

  /* <title> per page */
  var AR_TITLES = {
    'Cubit — Learn to Solve the Rubik\'s Cube': 'Cubit — تعلَّم حل مكعب روبيك',
    'Learn — Cubit': 'تعلَّم — Cubit',
    'Beginner Method — Cubit': 'طريقة المبتدئين — Cubit',
    'Advanced CFOP — Cubit': 'CFOP المتقدم — Cubit',
    'Pro Techniques — Cubit': 'تقنيات المحترفين — Cubit',
    'Cube Home': 'المكعب — الرئيسية',
    'learn': 'تعلَّم',
    'Log In': 'تسجيل الدخول',
    'Cube ⚙️Settings': 'المكعب ⚙️الإعدادات',
    'info from': 'معلوماتك',
    'plan form': 'اختر الخطة',
    'ons form': 'الإضافات',
    'Thanks': 'شكرًا',
  };

  /*
   * Pattern rules for systematic strings.
   * Each entry: [regex, match => replacement | null]
   * Applied AFTER exact dictionary lookup fails.
   */
  var PATTERNS = [
    // F2L/OLL bare numbered cases: "Case 13", "Cross 1", "P 2", "T 1", ...
    [/^Case (\d+)$/, function (m) { return 'الحالة ' + m[1]; }],
    [/^Mirror of (\d+)$/, function (m) { return 'معكوس الحالة ' + m[1]; }],
    [/^Mirror of Case (\d+)$/, function (m) { return 'معكوس الحالة ' + m[1]; }],
    [/^(Cross|P|W|T|L|C|U|H|Pi|Square|Kite|Knight|Awkward|Fish|Sune|Anti-Sune) (\d+)$/, function (m) {
      var names = {
        'Cross': 'الصليب', 'P': 'P', 'W': 'W', 'T': 'T', 'L': 'L', 'C': 'C', 'U': 'U', 'H': 'H',
        'Pi': 'باي', 'Square': 'مربع', 'Kite': 'طائرة ورقية', 'Knight': 'الفارس',
        'Awkward': 'الحرج', 'Fish': 'السمكة', 'Sune': 'سوني', 'Anti-Sune': 'أنتي-سوني'
      };
      return names[m[1]] + ' ' + m[2];
    }],
    // Search result count: `12 results for "sune"`
    [/^(\d+) results? for "(.+)"$/, function (m) { return arabicCount(Number(m[1])) + ' لـ«' + m[2] + '»'; }],
    // Play button aria: "Play algorithm: R U R' U'"
    [/^Play algorithm:\s*(.+)$/, function (m) { return 'تشغيل الخوارزمية: ' + m[1]; }],
    // Display button aria: "Display case: R U R' U'"
    [/^Display case:\s*(.+)$/, function (m) { return 'عرض حالة الخوارزمية: ' + m[1]; }],
    // main4.html injected summary lines
    [/^total\(per\s*(Month|Year)\)$/, function (m) {
      return 'الإجمالي (' + (m[1] === 'Month' ? 'شهريًا' : 'سنويًا') + ')';
    }],
    [/^([A-Za-z0-9]+)\((Monthly|Yearly)\)$/, function (m) {
      return m[1] + '(' + (m[2] === 'Monthly' ? 'شهري' : 'سنوي') + ')';
    }],
  ];

  /* Elements whose subtrees must never be translated (cube notation etc.).
     NOTE: notation CONTAINERS (.algo-box__notation/.algo-card__notation) are
     deliberately NOT skipped — Play/Display buttons live beside the moves in
     those containers. Every move token itself carries .cube-notation(-__move),
     which is skipped, so notation stays Latin while UI labels translate. */
  var SKIP_SELECTOR = [
    'script', 'style', 'code', 'pre', 'canvas', 'noscript',
    '.cube-notation', '.cube-notation__move', '.cube-btn__face'
  ].join(',');

  /* ====================================================================== */

  var changedText = [];   // [{node, orig}] to restore English later
  var changedAttrs = [];  // [{el, attr, orig}]
  var origTitle = null;
  var observer = null;
  var pendingPass = null;

  function normalize(s) {
    return s.replace(/\s+/g, ' ').trim();
  }

  /* Arabic-aware pluralization for the search result count */
  function arabicCount(n) {
    if (n === 0) return 'لا نتائج';
    if (n === 1) return 'نتيجة واحدة';
    if (n === 2) return 'نتيجتان';
    if (n >= 3 && n <= 10) return n + ' نتائج';
    return n + ' نتيجة';
  }

  /* Translate a normalized string; returns Arabic or null */
  function tr(text) {
    if (!text) return null;
    if (AR.hasOwnProperty(text)) return AR[text];
    if (/[\u0600-\u06FF]/.test(text)) return null; // already Arabic
    for (var i = 0; i < PATTERNS.length; i++) {
      var m = text.match(PATTERNS[i][0]);
      if (m) {
        var out = PATTERNS[i][1](m);
        if (out) return out;
      }
    }
    return null;
  }

  function translateTextNode(node) {
    var raw = node.nodeValue;
    if (!raw || !raw.trim()) return;
    var trimmed = normalize(raw);
    var ar = tr(trimmed);
    if (!ar || ar === trimmed) return;
    changedText.push({ node: node, orig: raw });
    // Preserve the node's own leading/trailing whitespace; the normalized
    // key may not appear verbatim inside raw when indentation/newlines differ.
    node.nodeValue = raw.match(/^\s*/)[0] + ar + raw.match(/\s*$/)[0];
  }

  function walk(root) {
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        var p = node.parentElement;
        if (!p) return NodeFilter.FILTER_REJECT;
        if (p.closest(SKIP_SELECTOR)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var list = [];
    while (walker.nextNode()) list.push(walker.currentNode);
    list.forEach(translateTextNode);
  }

  function translateAttrs(root) {
    ['aria-label', 'placeholder', 'title'].forEach(function (attr) {
      var dict = AR_ATTR[attr];
      if (!dict) return;
      var els = root.querySelectorAll('[' + attr + ']');
      Array.prototype.forEach.call(els, function (el) {
        var val = el.getAttribute(attr);
        if (!val) return;
        var ar = dict[val];
        if (!ar) {
          var norm = normalize(val);
          ar = norm && AR_ATTR[attr][norm];
        }
        if (!ar || ar === val) return;
        changedAttrs.push({ el: el, attr: attr, orig: val });
        el.setAttribute(attr, ar);
      });
    });
  }

  function translateTitle() {
    if (origTitle === null) origTitle = document.title;
    if (!origTitle) return;
    var ar = AR_TITLES[origTitle.trim()];
    document.title = ar ? ar : origTitle;
  }

  function restore() {
    changedText.forEach(function (rec) {
      if (rec.node.nodeValue !== rec.orig) rec.node.nodeValue = rec.orig;
    });
    changedText = [];
    changedAttrs.forEach(function (rec) {
      rec.el.setAttribute(rec.attr, rec.orig);
    });
    changedAttrs = [];
    if (origTitle !== null) document.title = origTitle;
  }

  function applyArabic() {
    translateTitle();
    walk(document.body || document);
    translateAttrs(document.body || document);
  }

  /* Debounced re-pass so JS-injected strings get translated too */
  function startObserver() {
    if (observer) return;
    observer = new MutationObserver(function () {
      if (currentLang() !== 'ar') return;
      clearTimeout(pendingPass);
      pendingPass = setTimeout(function () {
        applyArabic();
      }, 120);
    });
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  }

  /* ============================ Toggle UI ============================ */

  var GLOBE_SVG =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true" width="20" height="20">' +
    '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3z"/>' +
    '</svg>';

  function currentLang() {
    return localStorage.getItem(STORAGE_KEY) === 'ar' ? 'ar' : 'en';
  }

  function updateToggleLabel(btn) {
    var ar = currentLang() === 'ar';
    var hint = ar ? 'التبديل إلى الإنجليزية' : 'Switch to Arabic';
    btn.setAttribute('aria-label', hint);
    btn.setAttribute('title', hint);
    btn.setAttribute('aria-pressed', ar ? 'true' : 'false');
    var label = btn.querySelector('.lang-toggle__label');
    if (label) label.hidden = true;
  }

  function setLang(lang) {
    localStorage.setItem(STORAGE_KEY, lang);
    var ar = lang === 'ar';
    HTML.setAttribute('lang', ar ? 'ar' : 'en');
    HTML.setAttribute('dir', ar ? 'rtl' : 'ltr');
    if (ar) applyArabic(); else restore();
    var btn = document.getElementById('langToggle');
    if (btn) updateToggleLabel(btn);
    document.dispatchEvent(new CustomEvent('cubit:langchange', { detail: { lang: lang } }));
  }

  function injectToggle() {
    if (document.getElementById('langToggle')) return;
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.id = 'langToggle';
    btn.className = 'lang-toggle';
    btn.innerHTML = GLOBE_SVG;
    btn.addEventListener('click', function () {
      setLang(currentLang() === 'ar' ? 'en' : 'ar');
    });

    // New design pages: actions area beside the theme toggle
    var actions = document.querySelector('.navbar__actions');
    if (actions) { actions.insertBefore(btn, actions.firstChild); return; }

    // Legacy bondi pages: append into the collapsible navbar list
    var navList = document.querySelector('.navbar-nav');
    if (navList) {
      var li = document.createElement('li');
      li.className = 'nav-item lang-item';
      li.appendChild(btn);
      navList.appendChild(li);
      return;
    }

    // Pages without a navbar (login): floating button
    btn.classList.add('lang-toggle--floating');
    document.body.appendChild(btn);
  }

  /* ============================ Boot ============================ */

  function boot() {
    injectToggle();
    startObserver();
    setLang(currentLang()); // applies dir/lang + translation when stored as ar
  }

  if (document.readyState === 'loading') {
    // Registered last (this script loads after all others) so JS-rendered
    // algorithm cards exist before the first pass runs.
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
