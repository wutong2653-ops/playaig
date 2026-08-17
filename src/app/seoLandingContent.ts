export type SeoLandingSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type SeoLandingFaq = {
  question: string;
  answer: string;
};

export type SeoLandingLink = {
  label: string;
  href: string;
};

export type SeoLandingContent = {
  h1: string;
  title: string;
  description: string;
  sections: SeoLandingSection[];
  faq: SeoLandingFaq[];
  links: SeoLandingLink[];
};

export const guideLandingContent: Record<string, SeoLandingContent> = {
  "beginner-guide": {
    h1: "SpiritVale Beginner Guide 2026",
    title: "SpiritVale Beginner Guide 2026: Starter Guide | PlayAIG",
    description: "Use this SpiritVale beginner guide for confirmed systems, first steps, progression planning, equipment context and practical tips from PlayAIG.",
    sections: [
      {
        heading: "Introduction",
        paragraphs: [
          "SpiritVale is presented by its official Steam store as a class-based action MMO with real-time cooperative combat. The same first-party description refers to a fantasy world, monsters, ruins, bosses, biomes, dungeons, character growth, skills, equipment, cards, artifacts, loot, customization and multiplayer. That gives a new player a useful starting picture: SpiritVale is a game about learning a character system while exploring and fighting with other players, not a single isolated menu or a one-button progression loop.",
          "This beginner guide is intentionally practical and evidence-first. It explains what a new player can safely plan around, how to read the information that is available, and how to avoid locking in assumptions that the official material has not answered. Because SpiritVale is an Early Access game, a responsible starter guide should separate confirmed systems from advice that depends on a patch, a balance pass or an unreleased feature. Use the guide as a planning checklist, then compare the current in-game experience with the latest official update before making a permanent decision."
        ],
        bullets: ["Start with systems that are explicitly described by an official source.", "Treat unconfirmed routes, numbers and rankings as open questions.", "Recheck official updates whenever a system changes or a new feature appears."]
      },
      {
        heading: "What Beginners Should Do First",
        paragraphs: [
          "The first useful task is orientation rather than optimization. Read the current official description, identify the seven confirmed base-class names, and notice which parts of your character are expected to grow: levels, skills, equipment, cards, artifacts and customization are all mentioned by the registered source. This creates a vocabulary for the first session. When a menu or tutorial introduces a term, record what it actually does instead of immediately importing a build from another game.",
          "Next, make a short observation list. Note how the game presents combat, what the party system asks you to do, how rewards are named, and which actions are reversible. A simple list is more valuable than a guessed tier ranking because it survives patches. If a screen shows a statistic or an item effect that is not documented in the official source set, mark it as an in-game observation and do not present it as a verified SpiritVale rule until it can be checked against a first-party reference.",
          "Finally, decide what you want from the first session: learning movement, understanding party play, comparing classes, or simply seeing the world. A clear learning goal keeps a beginner from spending time on speculative upgrade paths. The official materials confirm cooperative combat and exploration, so those are safe themes to investigate; the exact best order for quests, zones or rewards is not currently confirmed here."
        ]
      },
      {
        heading: "Best Starting Strategy",
        paragraphs: [
          "The best starting strategy in an Early Access MMO is a low-regret strategy. Learn the controls, take note of the information the game gives you, and postpone irreversible choices until you understand the cost. If the game lets you inspect a class, skill, equipment piece or card before committing, read the description and save the wording. Screenshots or notes can help you compare later, but they should not be treated as official documentation by themselves.",
          "For group play, begin with communication and observation. The official store describes real-time cooperation and a multiplayer party system, which means a beginner can learn a great deal by watching how a group moves, starts encounters and shares attention. Ask what a mechanic means before assuming that a class has a fixed role. The seven class names are confirmed, but role labels, weapon assignments and difficulty ratings are not part of the verified class records used by this site.",
          "Keep the first plan flexible. Use a small number of resources to learn the interface, compare the language used by skills and equipment, and identify which parts of the character screen matter to your play. This approach is useful whether you play alone or with friends because it produces knowledge you can carry into a later build once official details become clearer."
        ],
        bullets: ["Learn the interface before spending scarce resources.", "Test one change at a time so its effect is understandable.", "Record observations separately from facts confirmed by official sources."]
      },
      {
        heading: "Early Game Progression",
        paragraphs: [
          "Official information confirms character leveling and skill progression, but it does not publish a complete level-by-level route. A useful beginner progression plan therefore has three layers. The first layer is access: learn how the game opens its world, combat and party systems. The second is understanding: connect a level or skill change to what you can observe in play. The third is refinement: only after you know what a system does should you decide whether an upgrade fits your preferred approach.",
          "Avoid treating every early reward as a permanent investment. Early Access games often change itemization, tutorial language and progression pacing. Keep a note of the version or date when you make an observation, and revisit it after an official update. If two players report different routes, do not force a single answer; identify whether the difference comes from a patch, a mode, a class choice or an unverified assumption.",
          "Progression also includes social learning. The official store mentions multiplayer parties, so a beginner can use cooperative sessions to see situations that are difficult to reproduce alone. Ask teammates which information is confirmed, compare the wording on the same screen, and return to the official source when a claim affects a long-term decision."
        ]
      },
      {
        heading: "Leveling Tips",
        paragraphs: [
          "The safest leveling tip is to connect an action to a learning objective. If you are learning combat, repeat a manageable encounter while watching timing and positioning. If you are learning the character screen, change one visible progression element and compare the result. If you are learning cooperation, join a group and focus on communication. This produces useful experience without pretending that an unpublished experience formula or fastest route is known.",
          "Keep your notes simple: date, activity, character state, observed result and source status. A note such as ‘the official page confirms leveling’ is different from ‘this activity gives a fixed amount of experience.’ The first is a sourced fact; the second requires a verified measurement. Separating them makes this guide more reliable and gives you a clean way to update your plan after a patch.",
          "When a level unlocks a new option, read the full description and check whether it changes your decisions. A new skill, equipment slot, card or artifact may be important, but this site does not currently have enough first-party data to rank those choices. The practical recommendation is to learn the option, test it safely, and keep alternatives open until the official record is fuller."
        ]
      },
      {
        heading: "Equipment Guide",
        paragraphs: [
          "The official store mentions equipment and loot, so equipment is a real part of SpiritVale’s confirmed system vocabulary. What is not yet confirmed is a complete item list, stat table, upgrade cost or best-in-slot path. A beginner should therefore treat the equipment screen as a learning surface: read the item name, compare the information shown in the game, and note whether an upgrade changes survivability, damage, utility or another visible value.",
          "Do not discard an item solely because another player calls it weak. Ask what the comparison is measuring, which class or activity it assumes, and whether the statement comes from a current first-party source. The Equipment Database on this site is intentionally empty until individual records can be verified. That protects a new player from following a polished but invented list.",
          "For a low-risk routine, keep one clearly understood option available, test a replacement in a safe encounter, and record the difference. Link your observations to the official source when one exists. If an equipment rule is not confirmed, the correct status is ‘Information will be updated,’ not a guessed number."
        ]
      },
      {
        heading: "Common Beginner Mistakes",
        paragraphs: [
          "The most common mistake is confusing a familiar genre pattern with a SpiritVale fact. A class name may suggest a role, a card may appear to imply a rarity, and a monster may look like it belongs to a known tier. None of those impressions are enough to support a guide claim. Use the official source and the current in-game wording before turning an impression into advice.",
          "Another mistake is following a build before understanding its assumptions. A build can depend on a weapon, skill, stat, difficulty, upgrade path or party role that has not been confirmed for SpiritVale. The seven base classes are confirmed, but those individual attributes remain open in the formal data. Keep your first decisions reversible and learn the system language before copying a recommendation.",
          "A final mistake is ignoring update context. SpiritVale is described as Early Access, so a guide written for one version can age quickly. Check the reviewed date, read official news, and report unclear changes as questions. Good beginner play is not about having every answer on day one; it is about building a process that keeps your answers accurate."
        ],
        bullets: ["Do not assume a class role from its name.", "Do not treat community guesses as verified data.", "Do not spend resources based on an unverified tier list.", "Do record the version and source behind important observations."]
      }
    ],
    faq: [
      { question: "What type of game is SpiritVale?", answer: "The official Steam page describes SpiritVale as a class-based action MMO with real-time cooperative combat." },
      { question: "How many base classes are confirmed?", answer: "Official material currently confirms seven base-class names: Acolyte, Mage, Summoner, Knight, Warrior, Scout and Rogue." },
      { question: "What should a beginner upgrade first?", answer: "There is no verified universal upgrade order yet. Learn the system, test one change at a time and keep choices flexible." },
      { question: "Is there a verified fastest leveling route?", answer: "No official fastest route or experience formula is recorded in the current data. Information will be updated when a first-party source confirms one." },
      { question: "Where can I check equipment and card information?", answer: "Use the Equipment and Cards database pages for collection status, then check the registered official source before relying on an individual claim." },
      { question: "How often should beginners recheck this guide?", answer: "Recheck it after official SpiritVale updates because Early Access systems and terminology can change." }
    ],
    links: [
      { label: "SpiritVale Cards Database", href: "/database/cards/" },
      { label: "SpiritVale Equipment Database", href: "/database/equipment/" },
      { label: "SpiritVale Class Guide", href: "/guides/class-guide/" },
      { label: "SpiritVale Classes", href: "/classes/" },
      { label: "SpiritVale Skills Database", href: "/database/skills/" }
    ]
  },
  "class-guide": {
    h1: "SpiritVale Class Guide 2026",
    title: "SpiritVale Class Guide 2026: Base Classes | PlayAIG",
    description: "Compare seven confirmed SpiritVale base classes, understand verified information and plan class research without unsupported role or build claims on PlayAIG.",
    sections: [
      {
        heading: "Class Overview",
        paragraphs: [
          "SpiritVale is described by its official Steam store as a class-based action MMO. The same source names seven base classes and refers to skill trees and advanced specializations as characters grow. That is enough to establish a meaningful class system, but not enough to publish a complete role chart. This guide helps players compare the confirmed class roster while keeping weapons, primary stats, difficulty, strengths, weaknesses and builds clearly marked as unverified.",
          "A good class guide should answer two questions at once: what does the official source actually confirm, and how can a player make a sensible choice while more detail is missing? The answer is to compare the class system rather than invent a winner. Read each name, inspect its current in-game presentation, record what you can reproduce, and return to the first-party source when a claim affects a long-term decision."
        ]
      },
      {
        heading: "All Available Classes",
        paragraphs: [
          "The formal SpiritVale class collection currently contains seven confirmed base-class records: Acolyte, Mage, Summoner, Knight, Warrior, Scout and Rogue. Each record is intentionally small. It stores the name, base-class identity and a registered official source, while role, weapon, stat, skill, progression and build fields remain empty. This is not a missing editorial opinion; it is a deliberate boundary that prevents a familiar fantasy label from becoming false game data.",
          "Use the class index as a map of what exists, then open an individual page when you need its verification status and sources. A class page should not be read as a promise that the name implies a healer, caster, tank, damage dealer, pet user, scout or stealth role. Until official SpiritVale material says so, those interpretations belong in the ‘not yet verified’ category.",
          "The current seven-name list is useful even without a full build guide. It lets a new player ask precise questions, organize observations and follow future official announcements without mixing classes together. It also gives the database and guide systems stable internal links."
        ],
        bullets: ["Acolyte", "Mage", "Summoner", "Knight", "Warrior", "Scout", "Rogue"]
      },
      {
        heading: "Best Classes For Beginners",
        paragraphs: [
          "There is no verified best class for beginners yet. A recommendation would require evidence about roles, weapons, skill availability, difficulty, survivability, resource demand and how each class performs in solo and cooperative situations. Those fields are not confirmed in the current class data. Choosing a class by name alone would make the page sound useful while giving a new player an unsupported expectation.",
          "A safer beginner method is preference-first research. Choose the class whose presentation interests you, inspect the available descriptions, and ask what you want to learn in the first session. If you prefer to explore, prioritize learning movement and world interaction. If you want cooperative practice, observe how the party system works. If you are comparing character screens, record the terms and values without assuming that one class is stronger.",
          "This approach still produces a decision. It simply treats the decision as a testable starting choice rather than a permanent ranking. Review your observations after a session, compare them with the official source, and switch or continue based on what you actually enjoy."
        ]
      },
      {
        heading: "Class Comparison",
        paragraphs: [
          "The most honest current comparison is a verification table. Every listed class is confirmed as a base-class name; none has a first-party role, weapon, main stat, difficulty or strength/weakness profile recorded here. This means the classes share a verified identity but not a verified performance ranking. A blank field is valuable information because it tells readers not to mistake a community label for a documented mechanic.",
          "When official details arrive, compare like with like. Record the source, date, version, exact wording and whether the claim is about a skill, a weapon, a stat or a play pattern. Avoid mixing a preview sentence with a later in-game tooltip. A comparison remains useful only when its evidence is comparable and current.",
          "Players can also compare the learning experience. How clear is the class screen? Which terms need explanation? Does a party member describe a role that the official source confirms? These observations can guide a beginner without pretending to be a damage or difficulty ranking."
        ]
      },
      {
        heading: "Class Progression",
        paragraphs: [
          "Official SpiritVale material refers to skill trees and advanced specializations as characters grow. That confirms progression language, but it does not publish a complete map from each base class to an advanced class. Do not fill that gap with a genre assumption. An advanced-class connection should appear here only when an official source states the pairing or the game exposes it with verifiable documentation.",
          "For practical progression research, save the wording of each unlock, note the character level or condition shown in-game, and identify whether the option is permanent. If the game changes a tooltip, record the new date. This creates a reliable history without requiring an invented progression route.",
          "The same discipline applies to skills. A skill tree can contain many choices, but a screenshot or a player comment is not enough to rank them for every class. Start with what you can test, then wait for first-party confirmation before publishing a recommended path."
        ]
      },
      {
        heading: "Recommended Builds",
        paragraphs: [
          "No recommended SpiritVale class build is currently verified. A genuine build requires at least a confirmed role, skill set, equipment interaction and progression context. The formal records for all seven classes deliberately leave those fields open. This guide therefore recommends a build-research process instead of a fictional stat spread: identify the goal, list the confirmed choices, test one change, and save the source behind the result.",
          "If you find a community build, treat it as an experiment rather than an official answer. Ask which patch it targets, whether its terminology matches the current client, and whether it assumes a party or solo setting. Link your notes to the class page and the official source. When the source set grows, this page can replace the process with a verified comparison.",
          "Until then, the strongest recommendation is flexibility. Avoid spending resources because a headline says one class is mandatory. Learn the controls, understand the available screens and choose the class that keeps you interested in the game."
        ]
      },
      {
        heading: "How To Read Future Class Updates",
        paragraphs: [
          "Class information changes quickly in an Early Access game. When an official news post, store update or in-game notice adds a detail, capture the exact wording and date. Identify whether it is a new fact, a balance change or a clarification of an existing system. Then update the class record with the narrowest claim that the source supports.",
          "Do not turn ‘has a skill tree’ into a list of skill names, or ‘advanced specialization’ into a confirmed job path. Specificity is useful only when evidence supports it. Readers benefit from a small, accurate comparison more than a large table that mixes guesses with facts.",
          "This method also keeps internal links trustworthy. The Class Guide can point to each class page, the Beginner Guide can explain how to research a choice, and the database can collect future skill or equipment records without forcing an unsupported relationship today."
        ]
      }
    ],
    faq: [
      { question: "How many SpiritVale base classes are confirmed?", answer: "Seven base classes are currently confirmed: Acolyte, Mage, Summoner, Knight, Warrior, Scout and Rogue." },
      { question: "Which class is best for beginners?", answer: "No official source currently confirms a best beginner class. Choose a class to test based on your preference and keep the decision flexible." },
      { question: "Are class roles and weapons verified?", answer: "No. The current formal records confirm names and base-class identity, but do not verify role, weapon or primary-stat assignments." },
      { question: "Does SpiritVale have advanced classes?", answer: "Official material refers to advanced specializations, but the exact base-class pairings are not yet confirmed in this data set." },
      { question: "Where should I find class updates?", answer: "Check the registered official SpiritVale Steam source and the class pages on PlayAIG for verification status and future updates." },
      { question: "Can I publish a verified class build now?", answer: "Not from the current source set. A build needs confirmed skills, equipment and progression details before it can be presented as verified." }
    ],
    links: [
      { label: "SpiritVale Beginner Guide", href: "/guides/beginner-guide/" },
      { label: "SpiritVale Knight Class Page", href: "/classes/knight/" },
      { label: "SpiritVale Classes Index", href: "/classes/" },
      { label: "SpiritVale Equipment Database", href: "/database/equipment/" },
      { label: "SpiritVale Skills Database", href: "/database/skills/" }
    ]
  }
};

const tier1GuideLandingContent: Record<string, SeoLandingContent> = {
  "first-steps": {
    h1: "SpiritVale First Steps Guide 2026",
    title: "SpiritVale First Steps Guide 2026 | PlayAIG",
    description: "Start SpiritVale with a verified first-session plan covering classes, systems, early progression and practical questions from PlayAIG.",
    sections: [
      { heading: "What To Know Before Starting", paragraphs: [
        "SpiritVale is described by its official Steam listing as a class-based action MMO with real-time cooperative combat. It is presented as an Early Access game, so a good first-session plan should favor learning and flexibility over a rigid route. The official description names a fantasy world, monsters, ruins, bosses, biomes and dungeons, giving a new player a clear sense of the experience without promising a specific opening sequence.",
        "The same source mentions character leveling, skills, equipment, cards, artifacts, loot and customization. Those are useful terms to recognize in the client. They are not a complete rulebook: the registered source does not confirm every stat, cost, drop, class role or progression breakpoint. Keep a note of what is observed in-game and what is supported by an official page."
      ] },
      { heading: "First Steps", paragraphs: [
        "Begin by learning the interface. Read the character, class and equipment screens slowly enough to understand the labels, then test movement and combat without trying to optimize every action. If a tooltip contains a condition, duration or cost, copy the exact wording into your notes. This turns a vague first impression into a question that can be checked after an update or against a first-party source.",
        "Set one small objective for the first session: understand a combat action, inspect a class screen, or learn how a party activity begins. A narrow objective gives you a useful stopping point and keeps you from spending resources simply because an option is available. If a choice cannot be reversed, wait until you know what the screen is asking you to commit to."
      ] },
      { heading: "Early Progression", paragraphs: [
        "Official information confirms character leveling and skill progression as themes, but there is no verified public level table, cap, experience formula or fastest route in the current source set. Progress by connecting one visible change to one result. Note what changed, where you tested it and which version you played. That record is more durable than a guessed order of activities.",
        "When a system feels unclear, use the question to guide the next session. Ask whether the change affected combat, exploration, party play or customization, then look for the exact wording in an official update. Information will be updated when a first-party source supports a more specific progression recommendation."
      ] },
      { heading: "Choosing A Class", paragraphs: [
        "Seven base-class names are formally confirmed: Acolyte, Mage, Summoner, Knight, Warrior, Scout and Rogue. The names establish identity, not role. The current data does not verify weapon assignments, primary stats, difficulty ratings, strengths, weaknesses or best builds. Choosing a class by interest and treating the first session as a test is therefore the lowest-regret approach.",
        "Use the Class Guide and individual class pages to compare verification status. Ask what you want to learn, whether you prefer solo or cooperative practice, and which presentation keeps you engaged. Do not promise a teammate that a class fills a particular role until an official source or an in-game record clearly supports that claim."
      ] },
      { heading: "Understanding Systems", paragraphs: [
        "Cards, artifacts, equipment and customization are named by the official store, but the formal database currently has no verified individual records for those collections. Learn where each system appears and what vocabulary it uses. A screenshot can help you remember an observation, but it should not become a public effect, rarity or acquisition claim without a registered first-party source.",
        "Keep an evidence log with three columns: confirmed fact, player observation and open question. This simple separation prevents a familiar RPG convention from slipping into your plan. It also makes future updates easier because you can replace an open question with the narrowest supported answer instead of rewriting a speculative guide."
      ] },
      { heading: "Common Early Questions", paragraphs: [
        "New players commonly ask what to upgrade first, which class is strongest and where early rewards come from. Those answers require item values, class mechanics and acquisition rules that are not yet officially documented here. Use the related guides for a research method, not a fabricated ranking, and check the official Steam source whenever a decision depends on a precise mechanic.",
        "A first session is successful when you finish with clearer questions and a repeatable habit. Record what you enjoyed, what confused you and which screen you want to revisit. Information will be updated as official SpiritVale sources add reliable detail; until then, a transparent boundary is more useful than a confident guess."
      ] }
    ],
    faq: [
      { question: "What should I do first in SpiritVale?", answer: "Learn the controls and read the confirmed system descriptions. No universal opening route is officially verified yet." },
      { question: "Should I choose a class immediately?", answer: "Choose a class you want to test, but keep the decision flexible because role and build details are not officially confirmed." },
      { question: "What should a beginner upgrade first?", answer: "No universal upgrade order is verified. Learn the system and test one change at a time." },
      { question: "Where can I verify SpiritVale information?", answer: "Use the registered official Steam source and the verification status shown on PlayAIG." },
      { question: "Will this first steps guide change?", answer: "Information will be updated when official SpiritVale sources confirm new systems or clarify existing ones." },
      { question: "Is SpiritVale in Early Access?", answer: "The official Steam listing identifies SpiritVale as an Early Access game, so systems may change." }
    ],
    links: [
      { label: "SpiritVale Beginner Guide", href: "/guides/beginner-guide/" },
      { label: "SpiritVale Class Guide", href: "/guides/class-guide/" },
      { label: "SpiritVale Classes", href: "/classes/" },
      { label: "SpiritVale Equipment Database", href: "/database/equipment/" },
      { label: "SpiritVale Database", href: "/database/" },
      { label: "SpiritVale Guides", href: "/guides/" }
    ]
  },
  "early-game-strategy": {
    h1: "SpiritVale Early Game Strategy Guide 2026",
    title: "SpiritVale Early Game Strategy Guide 2026 | PlayAIG",
    description: "Plan SpiritVale early progression with source-led goals, resource habits, class decisions and equipment guidance from PlayAIG.",
    sections: [
      { heading: "Early Game Goals", paragraphs: [
        "Set goals that remain useful when Early Access systems change. Learn the character screen, understand how cooperative combat begins, and identify which actions affect progression or customization. These goals are grounded in the official description without claiming a fixed route. A goal such as ‘understand this menu’ is safer than ‘reach this level in this time’ when the underlying values are not published.",
        "Use a short session plan: one system to read, one behavior to test and one note to save. The result should tell you what to try next. If a system is unclear, leave it as an open question rather than filling the gap with a genre convention."
      ] },
      { heading: "Progression Strategy", paragraphs: [
        "SpiritVale’s official material refers to character leveling, skill progression, class switching, equipment and loot. It does not provide a level-by-level table or verified fastest sequence. Build progression knowledge by comparing the same activity before and after one change, then record the result with its date and version. This creates an evidence trail that can survive balance updates.",
        "Avoid optimizing two unknown systems at once. If you change equipment and a skill together, you may not know which change mattered. A controlled experiment is slower for one session but much faster for future decisions because it gives you an explanation you can reuse."
      ] },
      { heading: "Resource Management", paragraphs: [
        "No verified SpiritVale currency list, cost table, drop rate or scarcity rule is currently stored. Protect flexibility by reading the full confirmation screen, checking whether a choice can be undone and postponing large commitments until the cost is clear. The goal is not to hoard blindly; it is to avoid spending because a familiar label implies a benefit the source never promised.",
        "Keep resource notes factual. Write the item name, quantity shown, activity and version, then mark any conclusion as provisional until a first-party source supports it. Information will be updated when official sources document the resource loop in enough detail to justify a recommendation."
      ] },
      { heading: "Class Decisions", paragraphs: [
        "The seven confirmed base classes are Acolyte, Mage, Summoner, Knight, Warrior, Scout and Rogue. Their names do not verify a party role, weapon, main stat or difficulty. Compare the class pages for what is confirmed, then choose a class that matches the kind of practice you want. A flexible test is more reliable than a copied tier list.",
        "If you play with others, explain what you are testing rather than promising a role. This keeps cooperation clear while the official details are incomplete. Revisit your choice after you understand the character screen and after an official update changes the available evidence."
      ] },
      { heading: "Equipment Decisions", paragraphs: [
        "Equipment is described as part of character growth and loot, but no item catalogue, stat sheet or upgrade cost is verified in the current database. Read each tooltip, note the context and test one change. Do not call an item best, mandatory or efficient unless a source supports the claim and the conditions are clear.",
        "The Equipment Database is intentionally transparent about its collection status. Use it to see whether a record exists, then use the registered official source to understand what the record means. Information will be updated as first-party material adds names, effects, costs or requirements."
      ] },
      { heading: "Mistakes To Avoid", paragraphs: [
        "The most common early strategy mistake is treating an observation as a rule. A single reward, a class name or a tooltip seen once may be useful evidence, but it does not prove exclusivity, ranking or universal behavior. Record the situation and wait for confirmation before building an entire route around it.",
        "A second mistake is changing too many variables at once. Keep the test small, preserve reversible choices and return to the official source when terminology changes. This makes your strategy clearer and prevents a temporary Early Access behavior from becoming permanent advice."
      ] }
    ],
    faq: [
      { question: "Is there an official early-game route?", answer: "No complete route is currently verified. Use goals and observations instead of a fixed sequence." },
      { question: "How should beginners manage resources?", answer: "Read exact costs, test one decision at a time and keep choices flexible while resource rules are undocumented." },
      { question: "Which class is strongest early?", answer: "No official strength ranking is available for the seven confirmed base classes." },
      { question: "What equipment should I prioritize?", answer: "No item priority is verified yet. Use the in-game wording and official updates as evidence." },
      { question: "When will strategy details be updated?", answer: "Information will be updated when first-party SpiritVale sources confirm routes, costs or progression rules." },
      { question: "Why use a controlled test?", answer: "Changing one variable at a time makes it easier to understand and reproduce a result." }
    ],
    links: [
      { label: "SpiritVale Leveling Guide", href: "/guides/leveling-guide/" },
      { label: "SpiritVale Beginner Guide", href: "/guides/beginner-guide/" },
      { label: "SpiritVale Class Comparison", href: "/guides/class-comparison/" },
      { label: "SpiritVale Equipment Database", href: "/database/equipment/" },
      { label: "SpiritVale Skills Database", href: "/database/skills/" },
      { label: "SpiritVale Classes", href: "/classes/" }
    ]
  },
  "common-beginner-mistakes": {
    h1: "SpiritVale Beginner Mistakes To Avoid",
    title: "SpiritVale Beginner Mistakes To Avoid | PlayAIG",
    description: "Avoid common SpiritVale beginner mistakes with an evidence-first checklist for classes, resources, progression and early decisions.",
    sections: [
      { heading: "Mistake 1: Assuming A Class Role", paragraphs: [
        "Acolyte, Mage, Summoner, Knight, Warrior, Scout and Rogue are confirmed base-class names. The names do not verify healing, tanking, ranged damage, pets or stealth. A familiar fantasy label can be a useful interest signal, but it is not a source-backed party assignment. Read the Class Guide and class pages before telling a group what a class must do.",
        "A better approach is to write down the exact behavior you observe, including activity and version. Keep it as a personal observation until an official source confirms the mechanic. This protects you from building a long-term plan around an assumption that Early Access may change."
      ] },
      { heading: "Mistake 2: Spending Before Understanding", paragraphs: [
        "Equipment, cards, artifacts and loot are named official systems, but individual names, costs, rarity and effects are not fully registered. Spending because a border looks valuable or a label sounds familiar can create a regret that the current documentation cannot explain. Read the complete tooltip and check whether the action is reversible first.",
        "When you do test an upgrade, change one variable and record the before-and-after state. The record turns a purchase into a learning step and makes a future correction possible. Information will be updated when official sources provide enough detail to describe a safe priority."
      ] },
      { heading: "Mistake 3: Copying An Unverified Route", paragraphs: [
        "No official fastest route, experience formula, level cap or drop table is currently stored. Copying a precise sequence from an unverified source can make a player waste time or expect a reward that is not documented. Start with a learning goal and note the activity, result and version instead of claiming that one route is universal.",
        "Use the Leveling Guide for a method: observe one progression signal, compare it with the official wording and keep the conclusion proportional to the evidence. A short, accurate note is more useful than a confident route that cannot be reproduced."
      ] },
      { heading: "Better Approach", paragraphs: [
        "Separate three kinds of notes: official facts, in-game observations and open questions. Official facts can be cited; observations can guide testing; questions tell you what to verify next. This structure keeps a personal discovery from silently becoming a public SpiritVale rule.",
        "Review your notes after each session. If a term changes, record the new wording and date. If a result cannot be reproduced, lower your confidence instead of repeating it as advice. This is especially important for an Early Access game with evolving systems."
      ] },
      { heading: "Beginner Checklist", paragraphs: [
        "Before a permanent decision, read the full confirmation screen, identify the cost, check whether the action can be reversed and decide what evidence would change your mind. Then link the question to the relevant PlayAIG guide or database category. The link is not a guarantee that an answer exists; it is a way to track the collection honestly.",
        "End a session by writing one thing you learned and one thing that remains unknown. This habit keeps curiosity productive and makes future official updates easier to apply. Information will be updated as source-backed facts become available."
      ] },
      { heading: "Common Questions", paragraphs: [
        "Players often ask whether a class is best, an item is mandatory or a route is fastest. The current formal data cannot answer those questions with verified numbers. The correct response is to explain the evidence boundary, point to the relevant collection and give a test plan rather than inventing a conclusion.",
        "A guide can still be actionable without false certainty. It can tell you what to inspect, what to record, which choice to postpone and where an official update will appear. That is the standard used across PlayAIG’s verified guide system."
      ] }
    ],
    faq: [
      { question: "Is it a mistake to choose a class by name?", answer: "A name can guide interest, but it does not confirm a role, weapon or difficulty." },
      { question: "Should beginners copy a build?", answer: "Only use a build as an experiment until its skills, equipment and assumptions are verified by an official source." },
      { question: "Is there a confirmed fastest route?", answer: "No official fastest route is currently recorded. Information will be updated when one is confirmed." },
      { question: "What should I record while playing?", answer: "Save exact tooltip wording, activity context, version and the question you are trying to answer." },
      { question: "Where can I verify a claim?", answer: "Check the registered official SpiritVale Steam source and the verification status on PlayAIG." },
      { question: "How can I avoid wasting resources?", answer: "Understand the cost and reversibility of an action, then test one change at a time." }
    ],
    links: [
      { label: "SpiritVale Beginner Guide", href: "/guides/beginner-guide/" },
      { label: "SpiritVale Early Game Strategy", href: "/guides/early-game-strategy/" },
      { label: "SpiritVale Class Guide", href: "/guides/class-guide/" },
      { label: "SpiritVale Equipment Database", href: "/database/equipment/" },
      { label: "SpiritVale Cards Database", href: "/database/cards/" },
      { label: "SpiritVale Database", href: "/database/" }
    ]
  },
  "class-comparison": {
    h1: "SpiritVale Class Comparison Guide 2026",
    title: "SpiritVale Class Comparison Guide 2026 | PlayAIG",
    description: "Compare the seven confirmed SpiritVale classes with source boundaries, beginner criteria and practical class-selection guidance from PlayAIG.",
    sections: [
      { heading: "Class Overview", paragraphs: [
        "The official Steam page describes SpiritVale as class-based and mentions skill trees and advanced specializations. The formal data records seven base classes: Acolyte, Mage, Summoner, Knight, Warrior, Scout and Rogue. This is a stable starting point for comparison, but it is not a complete role matrix. The source set does not verify weapons, main stats, difficulty or damage profiles.",
        "A comparison page earns trust by showing the blank fields as unknown. That tells a reader exactly what a later official update needs to add. It also prevents a fantasy stereotype from becoming a search result that players mistake for game documentation."
      ] },
      { heading: "Class Comparison", paragraphs: [
        "Compare the seven classes on confirmed identity first. Each is a base-class record with a source, while role and build fields await more evidence. For a practical session, compare the clarity of each class screen, the terminology it uses and the type of practice you want. These are player-centered criteria, not hidden claims about combat power.",
        "When a source publishes a skill, weapon or progression detail, add it to the narrowest matching field. Do not combine a preview sentence with an unrelated observation. A fair comparison needs the same evidence standard for every class and a review date so readers can see when it was checked."
      ] },
      { heading: "Beginner Friendly Classes", paragraphs: [
        "There is no verified beginner ranking. A beginner-friendly choice is one whose interface you can understand and whose first-session goal you can explain. Some players may prefer exploring the world, others may want cooperative practice or character customization. Choose from the confirmed roster based on that purpose, then keep the decision flexible while you learn.",
        "Use the Beginner Guide for a low-regret first session and return to this page after testing a class. A personal preference is valid advice when it is labeled as preference; it should not be presented as an official difficulty or strength tier."
      ] },
      { heading: "Playstyle Differences", paragraphs: [
        "Player reports can be useful clues, but they are not a replacement for first-party class documentation. If a class appears to feel faster, safer or more complex, record the activity, patch context and behavior you can reproduce. Avoid turning one encounter into a universal rule about the class.",
        "The official source confirms cooperative combat and a changing Early Access environment. That makes context important: a class impression in a party may not describe a solo session, and a preview may not match a later client. Keep comparisons specific until the source set grows."
      ] },
      { heading: "Choosing A Class", paragraphs: [
        "Start with the class that gives you a clear question to answer. Learn its screen, read its available text and test one system. Then compare your notes with the registered source and class page. If the decision is reversible, treat it as an experiment; if it is permanent, wait until the cost and effect are clear.",
        "A good choice is one you can revisit without losing trust in the guide. Information will be updated when official SpiritVale material adds comparable roles, skills, weapons or progression details."
      ] },
      { heading: "How Future Updates Will Be Compared", paragraphs: [
        "When an official update arrives, capture exact wording, source type, date and version. Mark whether it adds a new fact, clarifies a system or changes a balance value. Then update every class on the same standard. This prevents one well-documented class from looking complete simply because the others have not been reviewed yet.",
        "A transparent comparison can be useful before it is exhaustive. It can name what is confirmed, explain what is not, and give the player a method for choosing. That is the basis for every future verified class guide on PlayAIG."
      ] }
    ],
    faq: [
      { question: "How many classes can be compared?", answer: "Seven base-class names are currently confirmed: Acolyte, Mage, Summoner, Knight, Warrior, Scout and Rogue." },
      { question: "Which class is best for beginners?", answer: "No official beginner ranking is confirmed. Choose a class to test based on your interests." },
      { question: "Are class roles verified?", answer: "No. Role, weapon, main stat and difficulty fields remain unverified." },
      { question: "Does SpiritVale have advanced specializations?", answer: "Official material refers to advanced specializations, but exact class pairings are not confirmed here." },
      { question: "Where will comparison updates appear?", answer: "PlayAIG class pages will be updated when registered official sources add comparable details." },
      { question: "Can a personal impression be official data?", answer: "No. Label it as an observation until a first-party source confirms the mechanic." }
    ],
    links: [
      { label: "SpiritVale Class Guide", href: "/guides/class-guide/" },
      { label: "SpiritVale Best Classes For Beginners", href: "/guides/best-classes-for-beginners/" },
      { label: "SpiritVale Classes", href: "/classes/" },
      { label: "SpiritVale Beginner Guide", href: "/guides/beginner-guide/" },
      { label: "SpiritVale Skills Database", href: "/database/skills/" },
      { label: "SpiritVale Equipment Database", href: "/database/equipment/" }
    ]
  },
  "best-classes-for-beginners": {
    h1: "Best SpiritVale Classes For Beginners 2026",
    title: "Best SpiritVale Classes For Beginners 2026 | PlayAIG",
    description: "Choose a SpiritVale starting class with transparent beginner criteria, confirmed class names and evidence-first guidance from PlayAIG.",
    sections: [
      { heading: "Introduction", paragraphs: [
        "The phrase ‘best class’ suggests a ranking, but a ranking needs evidence about role, survivability, weapons, skills, resource demand and progression. SpiritVale’s official material currently confirms seven base-class names and a class-based game, not a beginner tier list. This page answers the search intent honestly by giving you a decision framework you can use now.",
        "A useful recommendation can be personal without pretending to be official. Decide what you want to learn, select a class that keeps you curious, test it in context and record what you can reproduce. Revisit the choice when first-party information expands."
      ] },
      { heading: "Beginner Criteria", paragraphs: [
        "Start with four questions: Can you understand the class screen? Can you practice the system you care about? Are early choices reversible? Does the source support the claim you are using to decide? These questions reduce regret because they focus on learning and clarity rather than a number that may change in Early Access.",
        "If you play cooperatively, add a fifth question: can you describe what you are testing to your group? Clear communication matters when role assignments are not verified. A class name can start a conversation; it cannot finish one."
      ] },
      { heading: "Class Recommendations", paragraphs: [
        "Acolyte, Mage, Summoner, Knight, Warrior, Scout and Rogue are the seven confirmed choices. No source-backed ranking places one above another. Pick the presentation or name that interests you, then use a short session to learn controls, screens and terminology. This is an actionable recommendation to test, not a claim that every class performs identically.",
        "Use the Class Comparison guide to keep notes comparable. Record the same kind of evidence for each test and avoid using a community label as if it were an official role. Information will be updated when a first-party source documents a mechanic that supports a more specific choice."
      ] },
      { heading: "Strengths And Weaknesses", paragraphs: [
        "No official strength or weakness profile is currently available. Do not infer damage, defense, range, mobility, pets or stealth from the class name. If you observe a trade-off, document the activity, version and behavior, then label it as an observation until a source confirms the mechanic.",
        "This boundary does not make the choice impossible. It tells you how to choose responsibly: test what matters to your goal, keep commitments flexible and return to the official source when a patch changes the evidence."
      ] },
      { heading: "Recommended Starting Choices", paragraphs: [
        "The recommended starting choice is the class that gives you a clear learning question. Maybe you want to understand cooperative combat, character customization or the class screen. Start there, test one system and decide whether you want to continue. If the game allows a reversible switch, use it as a comparison tool rather than a failure.",
        "Keep your resources flexible while the formal skills and equipment collections are empty. The related database pages show which information is verified and which is still in progress. That transparency is part of the recommendation: choose with the facts you have, not the facts a headline invents."
      ] },
      { heading: "Reviewing Your Choice", paragraphs: [
        "After a session, write what felt clear, what felt difficult and what you could reproduce. Distinguish interface friction from a class mechanic and encounter difficulty from a permanent weakness. This note helps you make a better next decision than a generic tier list because it describes your actual goal.",
        "Information will be updated as official SpiritVale sources confirm skills, equipment, roles or progression. When that happens, compare the new claim with your notes and check whether it changes the decision you made."
      ] }
    ],
    faq: [
      { question: "What is the best SpiritVale class for beginners?", answer: "No official source confirms a best class yet. Choose a class to test based on your goals and keep the decision flexible." },
      { question: "Which class names are confirmed?", answer: "Acolyte, Mage, Summoner, Knight, Warrior, Scout and Rogue are confirmed base classes." },
      { question: "Can I choose by role?", answer: "Not from verified data yet; roles, weapons and primary stats are not confirmed." },
      { question: "Are beginner builds available?", answer: "No official builds are published in the current source set. Information will be updated as skills and equipment are confirmed." },
      { question: "How should I recheck my choice?", answer: "Review official updates and compare the class page after new first-party information appears." },
      { question: "Is a player impression useful?", answer: "Yes, as an observation that guides testing; it is not official data without a registered source." }
    ],
    links: [
      { label: "SpiritVale Class Comparison", href: "/guides/class-comparison/" },
      { label: "SpiritVale Class Guide", href: "/guides/class-guide/" },
      { label: "SpiritVale Classes", href: "/classes/" },
      { label: "SpiritVale Beginner Guide", href: "/guides/beginner-guide/" },
      { label: "SpiritVale Skills Database", href: "/database/skills/" },
      { label: "SpiritVale Equipment Database", href: "/database/equipment/" }
    ]
  },
  "cards/card-effects": {
    h1: "SpiritVale Card Effects Guide 2026",
    title: "SpiritVale Card Effects Guide 2026 | PlayAIG",
    description: "Learn how to read and research SpiritVale card effects with verified system context and transparent source boundaries from PlayAIG.",
    sections: [
      { heading: "Card System Overview", paragraphs: [
        "The official Steam page identifies cards as part of SpiritVale’s character customization and gear context. A registered community card index now supplies a first reviewed sample of individual names, slots and effects, while the official source remains the authority for first-party claims.",
        "A database entry preserves the exact card name, effect wording, conditions and source. Community records are labelled as such and fields that the source does not publish remain empty rather than being inferred."
      ] },
      { heading: "Understanding Card Effects", paragraphs: [
        "When a card screen is available, copy the complete text rather than a shortened summary. Conditions such as activity, target, duration or stacking can change the meaning of an effect. Record where the text appeared, which character state was active and which version you checked. These details make later verification possible.",
        "Separate a visible result from a claimed formula. Seeing a number change after equipping a card does not prove that the card alone caused the change or that the result applies everywhere. Test one variable where possible and keep the conclusion proportional to what you can reproduce."
      ] },
      { heading: "Reading Conditions And Duration", paragraphs: [
        "Players often overlook the small words that define an effect. Look for requirements, triggers, duration, limits, cooldowns and whether a bonus applies to a class, item or activity. If the game does not explain a term, write it as an open question. Information will be updated when official sources clarify the wording.",
        "Do not translate a familiar phrase into a familiar mechanic automatically. SpiritVale may use a term differently from another game. The safest guide language repeats the source wording first and adds an interpretation only when the evidence supports it."
      ] },
      { heading: "Card Usage Strategy", paragraphs: [
        "A safe card strategy is experimental. Define the problem you want to solve, note the baseline, change one variable and compare the result in the same context. This approach helps you learn without declaring a universal best card. It also gives future official documentation a precise observation to confirm or correct.",
        "Keep resource decisions reversible where possible. The current community records do not establish a complete rarity, cost, drop or ranking system, so spending because of a headline carries unnecessary risk. Use the Cards Database to compare the recorded effect wording and source status before treating a card as mandatory."
      ] },
      { heading: "Related Systems", paragraphs: [
        "Cards are connected in the official vocabulary to equipment, artifacts, skills and character customization. That relationship is a reason to compare pages, not proof of compatibility or a particular build. Read the related database pages to see which collections have verified entries and which are still awaiting official information.",
        "Class choice can also change the question you ask about a card, but no class-specific card interaction is currently confirmed. Record a possible interaction as a research lead, then verify it before publishing a recommendation."
      ] },
      { heading: "Future Card Records", paragraphs: [
        "When a first-party or approved community source confirms an individual card, the record should include its exact name, effect, context, source owner, review date and any unresolved condition. A card page can then explain usage without pretending that a higher rarity is always better or that one activity is the only source.",
        "This evidence-first process keeps the guide useful between updates. It tells you how to read what you see today and how the public database will grow tomorrow. Information will be updated when registered sources provide additional verifiable card details."
      ] }
    ],
    faq: [
      { question: "Are individual card effects verified?", answer: "The first Card records are verified against a registered community source and are clearly labelled; they are not official developer records." },
      { question: "Does SpiritVale have a card system?", answer: "Yes. The official Steam source identifies cards as part of character customization and gear context." },
      { question: "Is card rarity confirmed?", answer: "A formal rarity system is not yet confirmed by the registered official sources." },
      { question: "How should I research an effect?", answer: "Save exact wording, conditions, version and context, then compare it with a first-party source." },
      { question: "When will the card guide be updated?", answer: "Information will be updated when registered sources confirm additional individual cards or effects." },
      { question: "Can I publish a card tier list now?", answer: "No. There are no verified card records or effects to support a trustworthy ranking." }
    ],
    links: [
      { label: "SpiritVale Cards Database", href: "/database/cards/" },
      { label: "SpiritVale Card System Guide", href: "/guides/card-system-guide/" },
      { label: "SpiritVale Equipment Database", href: "/database/equipment/" },
      { label: "SpiritVale Stats Guide", href: "/guides/stats-guide/" },
      { label: "SpiritVale Database", href: "/database/" },
      { label: "SpiritVale Beginner Guide", href: "/guides/beginner-guide/" }
    ]
  },
  "equipment/upgrade-system": {
    h1: "SpiritVale Equipment Upgrade Guide 2026",
    title: "SpiritVale Equipment Upgrade Guide 2026 | PlayAIG",
    description: "Plan SpiritVale equipment upgrades with verified system context, safe testing habits and transparent limits on stats and costs from PlayAIG.",
    sections: [
      { heading: "Equipment System Overview", paragraphs: [
        "The official SpiritVale store names equipment, armor, loot, materials and upgrades as part of character growth. That confirms the vocabulary and the importance of equipment decisions, but it does not publish a complete item catalogue, slot map, stat formula or upgrade cost. This guide explains how to reason about upgrades while those details remain pending.",
        "An empty Equipment Database is deliberate. A future record should identify the item precisely, preserve its source wording and distinguish a confirmed rule from a player observation. Until then, avoid presenting a familiar rarity or upgrade ladder as SpiritVale fact."
      ] },
      { heading: "Upgrade Concepts", paragraphs: [
        "Read every confirmation screen for item name, material, cost, result and reversibility. If the game shows a before-and-after value, record the context and version. A single change can teach you about an interface, but it does not prove a universal breakpoint or that the same cost applies to every item.",
        "Use a small notebook or capture workflow to preserve wording. The goal is not to collect unverified numbers; it is to make future verification efficient. Information will be updated when official sources document the rules that connect an upgrade to a result."
      ] },
      { heading: "Progression Strategy", paragraphs: [
        "Choose upgrades around a question you can answer. Are you learning what a stat screen means, whether a material is consumed, or how a change appears in combat? Test one variable and keep the activity consistent. This produces a clearer explanation than changing equipment, class and skill choices at the same time.",
        "No verified item priority, cost table or best-in-slot list is available. Keep resources flexible when a decision is expensive or permanent, and check the official source before turning a personal route into a recommendation."
      ] },
      { heading: "Equipment And Other Systems", paragraphs: [
        "Equipment is named alongside skills, cards, artifacts and customization. Those pages form a useful research cluster, but the shared vocabulary does not prove a particular interaction. If an item appears to affect a skill or card, record the exact context and wait for first-party confirmation before calling it a class requirement or build rule.",
        "Use the Skills, Cards and Equipment database pages to see what is verified. A page marked as collection in progress is not an invitation to fill the gap with a community list; it is a signal to keep the decision open."
      ] },
      { heading: "Common Questions", paragraphs: [
        "Players ask which item is best, what to upgrade first and where equipment comes from. The official source set currently mentions loot and upgrades without a detailed item table. A trustworthy answer therefore explains the evidence boundary and gives a test plan rather than claiming a precise route or stat value.",
        "This approach is still practical. It tells you what to read, what to save, what to compare and when to wait. As soon as a first-party source confirms an item or rule, the same structure can become a detailed, source-backed entry."
      ] },
      { heading: "Future Verified Upgrade Records", paragraphs: [
        "A future record should list the exact item, upgrade action, materials, stated result, requirements, version and official source. It should also say what remains unknown. That level of detail lets players compare options without assuming that higher numbers always mean a better choice in every context.",
        "Until those records exist, follow the safe routine: read, record, test one change, verify and then decide. Information will be updated as official SpiritVale material expands the equipment system."
      ] }
    ],
    faq: [
      { question: "Are equipment upgrades confirmed in SpiritVale?", answer: "Official material mentions equipment upgrades, but detailed rules are not fully documented in the current source set." },
      { question: "What does an upgrade cost?", answer: "No verified cost table is currently available. Information will be updated when official details are published." },
      { question: "What equipment is best?", answer: "No best-equipment ranking is officially confirmed yet." },
      { question: "How should I test an upgrade?", answer: "Record the item, wording, context and version, then compare one change at a time." },
      { question: "When will upgrade data be added?", answer: "Future verified equipment records will appear when registered official sources confirm them." },
      { question: "Can a screenshot prove an upgrade rule?", answer: "It can preserve an observation, but a rule should be tied to a registered first-party source." }
    ],
    links: [
      { label: "SpiritVale Equipment Database", href: "/database/equipment/" },
      { label: "SpiritVale Stats Guide", href: "/guides/stats-guide/" },
      { label: "SpiritVale Leveling Guide", href: "/guides/leveling-guide/" },
      { label: "SpiritVale Cards Database", href: "/database/cards/" },
      { label: "SpiritVale Skills Database", href: "/database/skills/" },
      { label: "SpiritVale Beginner Guide", href: "/guides/beginner-guide/" }
    ]
  }
};

Object.assign(guideLandingContent, tier1GuideLandingContent);

// The card collection now contains source-backed community records. Keep the
// guide explicit about what those records do (and do not) prove so the guide
// and database hub answer the same search intent without overstating authority.
const cardGuideLanding = guideLandingContent["card-system-guide"];
if (cardGuideLanding) {
  cardGuideLanding.sections.splice(1, 0, {
    heading: "Verified Card Records",
    paragraphs: [
      "The SpiritVale Cards Database currently contains 50 source-backed card records from a registered community source. These records preserve names, category labels and source-listed effect text where available; they are community evidence, not official developer records.",
      "Use the records as a transparent lookup starting point. Rarity, acquisition rules, class compatibility and rankings remain unconfirmed unless the individual entry displays evidence for that field. The database keeps those fields marked as unavailable instead of inferring them from a familiar game system."
    ],
    bullets: [
      "50 source-backed card records are currently listed.",
      "Community records are labelled separately from official Steam confirmation.",
      "Unsupported rarity, acquisition and ranking claims remain open questions."
    ]
  });
  cardGuideLanding.faq = [
    ...cardGuideLanding.faq,
    { question: "How many card records are currently listed?", answer: "The Cards Database currently lists 50 source-backed community records; they are not official developer records." }
  ];
  cardGuideLanding.links = [
    ...cardGuideLanding.links,
    { label: "Abomination Card", href: "/database/cards/abomination-card/" },
    { label: "Bull Shark Card", href: "/database/cards/bull-shark-card/" },
    { label: "Bumblebee Card", href: "/database/cards/bumblebee-card/" }
  ];
}

export const databaseLandingContent: Record<string, SeoLandingContent> = {
  cards: {
    h1: "SpiritVale Cards Database - Complete Card List",
    title: "SpiritVale Cards Database: Complete List | PlayAIG",
    description: "Explore the SpiritVale Cards Database for collection status, card categories and verified effects, with transparent updates from PlayAIG today.",
    sections: [
      {
        heading: "Cards Overview",
        paragraphs: [
          "Cards are one of the systems named by the official SpiritVale Steam store. The source places cards alongside skills, equipment, artifacts, loot and character customization, which makes the card collection a useful area for players who want to understand how a character may grow. The PlayAIG collection now lists 50 source-backed community records with their source status visible on each entry.",
          "Those records are not official developer records and they do not establish a complete rarity, acquisition or ranking system. A trustworthy database shows both the available evidence and its limits: names, categories and source-listed effect text can be reviewed, while unsupported fields remain marked as unavailable rather than inferred."
        ]
      },
      {
        heading: "Verified Card Records",
        paragraphs: [
          "Use the list above to open individual card records and compare the exact source-backed wording. The first records include examples such as Abomination Card, Bull Shark Card and Bumblebee Card; each page keeps its registered source and verification date visible.",
          "A record is useful for lookup, not a promise that the card is best, universally available or compatible with a particular class. Read the category and effect fields as published by the registered community source, then check the entry status before using it to plan a build."
        ],
        bullets: [
          "50 source-backed card records are currently available.",
          "Community evidence is distinct from official Steam confirmation.",
          "Rarity, acquisition and ranking remain unverified where the source does not publish them."
        ]
      },
      {
        heading: "Card Categories",
        paragraphs: [
          "The current formal data model reserves a Cards collection, but it does not yet define verified subcategories. Do not assume that cards are divided by element, class, slot, activity or rarity simply because other games use those labels. A useful category system will be added when official SpiritVale material establishes the categories and their meaning.",
          "For now, organize your own observations by source and context. Record where a card was shown, the exact label used, and whether the screen describes a permanent collection item, a temporary reward or another system. Keep that note separate from the public database until it can be checked against a registered official source.",
          "This approach helps future updates land cleanly. If the official source introduces a category, the database can add it without rewriting a speculative taxonomy or moving invented entries between tabs."
        ],
        bullets: ["Verified category: none published yet.", "Pending evidence: element, class, slot, activity and collection labels.", "Update rule: add a category only when official wording supports it."]
      },
      {
        heading: "Card Rarity System",
        paragraphs: [
          "No official rarity scale is currently recorded for SpiritVale cards. Words such as common, rare, epic or legendary may be familiar, but using them here would imply a system that the current source set has not confirmed. The correct status is Information will be updated when official SpiritVale sources document a rarity system.",
          "If you see a rarity label in the game, capture the exact label and context, then check whether an official page, patch note or store update explains it. A label without a source can still be a useful player observation, but it should not become a database field until the meaning is clear. Avoid comparing cards by color or border alone because visual hierarchy is not proof of a formal rarity.",
          "Once a rarity system is confirmed, this section can explain its names, ordering and relationship to acquisition without claiming that a higher tier is always better. A complete card page should distinguish rarity from effect, availability and the situation in which a card is useful."
        ]
      },
      {
        heading: "Card Effects",
        paragraphs: [
          "The 50-card collection includes source-listed effect text for the records where the registered community source publishes it. These are evidence-backed community fields, not official developer balance notes, so the page does not turn them into damage rankings, universal modifiers or class recommendations.",
          "When effect data becomes available, each record should preserve the source wording, the version in which it was checked, and any conditions that change the result. A useful effect entry will answer what the card does, when it applies, whether it stacks, and which official source supports the description. If one of those questions remains open, the record should say so.",
          "Use the in-game card screen for direct observation and the official source for confirmation. Do not treat a community effect summary as official, and do not infer a missing condition, duration or scaling rule."
        ]
      },
      {
        heading: "How To Obtain Cards",
        paragraphs: [
          "The official store mentions loot and cards but does not provide a verified acquisition table. This page therefore does not claim that cards come from a particular dungeon, boss, quest, shop, event or crafting recipe. Those are exactly the details that should be added only after an official source confirms them.",
          "For future acquisition records, document the source type, the named activity, any stated requirements and the date checked. Separate ‘available from’ from ‘observed after’ because a player observation does not prove that an activity is the only source. If the official material gives a broad statement, keep the database broad rather than filling the gap with a precise but unsupported route.",
          "Players can still prepare by learning the collection screen and keeping notes. When the first official card list arrives, a well-organized record will be easier to compare than a collection of unverified screenshots."
        ]
      },
      {
        heading: "Best Cards Ranking",
        paragraphs: [
          "A best-cards ranking is not available because the current records do not provide a complete, officially confirmed set of effects, rarity values or activity assumptions to compare. A ranking without those inputs would be a headline rather than a useful guide. This page will not label a card as best, must-have or meta until the evidence supports a repeatable comparison.",
          "The future ranking method should be transparent. It should name the source, version, card effect, conditions, class or mode assumptions and the reason a card is useful. It should also explain trade-offs: a card can be strong in one situation without being the best universal choice. Readers deserve that context instead of a single unexplained tier.",
          "For now, compare the official wording and your own play goals. Keep notes about what you are trying to solve and wait for verified records before spending resources around a ranking."
        ]
      },
      {
        heading: "Card Strategy Tips",
        paragraphs: [
          "The most reliable card strategy today is information management. Read the card screen carefully, record exact text, and avoid spending a scarce resource because a tooltip sounds familiar. If a card appears to interact with equipment, skills or a class, treat that interaction as a question until a first-party source confirms it.",
          "Use small experiments when the game allows them. Change one variable, observe the result, and note the activity, character state and date. That method helps you learn without turning a single outcome into a universal rule. Share observations as observations, not as an official database entry.",
          "The Cards Database is useful now as a source-aware lookup and will become more complete as additional official details arrive. Its value is clarity: community records are visible, unsupported fields are pending, and future information will be added with sources rather than guesses."
        ]
      }
    ],
    faq: [
      { question: "Are any SpiritVale card entries available?", answer: "Yes. The formal PlayAIG collection currently lists 50 source-backed community records, clearly separated from official developer confirmation." },
      { question: "What card effects are confirmed?", answer: "The collection preserves source-listed effect text where the registered community source publishes it; unsupported conditions and official balance claims remain unverified." },
      { question: "Does SpiritVale have a card rarity system?", answer: "A formal rarity scale is not yet confirmed by the registered official sources." },
      { question: "How do players obtain cards?", answer: "The official store mentions cards and loot but does not provide a verified acquisition table yet." },
      { question: "Which SpiritVale cards are best?", answer: "No ranking is published because there are no verified card records or effects to compare." },
      { question: "Where will new card information appear?", answer: "Future verified card records will be added to this collection with their official source and review status." }
    ],
    links: [
      { label: "SpiritVale Equipment Database", href: "/database/equipment/" },
      { label: "SpiritVale Knight Class Guide", href: "/classes/knight/" },
      { label: "SpiritVale Beginner Guide", href: "/guides/beginner-guide/" },
      { label: "SpiritVale Database", href: "/database/" },
      { label: "SpiritVale Class Guide", href: "/guides/class-guide/" },
      { label: "Abomination Card", href: "/database/cards/abomination-card/" },
      { label: "Bull Shark Card", href: "/database/cards/bull-shark-card/" },
      { label: "Bumblebee Card", href: "/database/cards/bumblebee-card/" }
    ]
  },
  equipment: {
    h1: "SpiritVale Equipment Database - Complete Equipment List",
    title: "SpiritVale Equipment Database: Complete List | PlayAIG",
    description: "Browse the SpiritVale Equipment Database for item types, stats, upgrades and verified beginner guidance, with transparent records from PlayAIG.",
    sections: [
      {
        heading: "Equipment Overview",
        paragraphs: [
          "The official SpiritVale Steam store names equipment as part of character growth and loot. The current pilot collection contains 50 community-sourced records with field-level source locators, clearly marked as partially verified rather than official developer data.",
          "These records answer a practical lookup question without pretending to be a complete item catalogue. Every future record must keep its source locator, confidence and review status; unsupported rarity, class restrictions and upgrade rules remain unverified."
        ]
      },
      {
        heading: "Equipment Types",
        paragraphs: [
          "The pilot records use the category labels displayed by the community source, such as Shield, Utility, Shoes and Headgear. These labels are source-backed strings, not a complete official taxonomy. Do not assume that SpiritVale equipment is divided into weapons, armor, accessories, sets or slots simply because those categories are common in other action MMOs.",
          "If the game shows an equipment type, note the exact label, where it appears, and whether it affects a character, a skill or a collection. Treat the observation as provisional until a first-party page or update confirms it. This keeps the public database honest while still giving the community a clear list of questions to watch.",
          "When types are confirmed, the page should make them scannable and link each type to its own verified records. It should not imply that a type is available to every class unless that relationship is also documented."
        ],
        bullets: ["Pilot category labels: Shield, Utility, Shoes and Headgear.", "Pending evidence: rarity, taxonomy IDs, class relations and set rules.", "Update rule: preserve source wording and source context."]
      },
      {
        heading: "Equipment Stats",
        paragraphs: [
          "The four pilot records preserve displayed stat text from a registered Level 2 community source. These values are labelled partially verified and are not presented as official developer numbers. The collection still does not establish a complete attack, defense, attribute, requirement, rarity, durability or upgrade model.",
          "Future stat records should include the exact value, the condition under which it appears, the version checked and the source that supports it. If a stat changes with level, enhancement or class, those relationships should be stated rather than flattened into one headline number. Readers need to know whether they are comparing base values, upgraded values or a temporary effect.",
          "Until then, inspect equipment in-game and record observations separately. The database status remains Data Collection In Progress so a missing stat cannot be mistaken for a zero stat or a hidden recommendation."
        ]
      },
      {
        heading: "Best Equipment",
        paragraphs: [
          "There is no verified best equipment list yet. A best-item claim needs a confirmed item name, stats, acquisition context and the goal being measured. Without those inputs, a ranking would reward familiarity with the genre rather than evidence from SpiritVale. This page will not call an item best-in-slot, mandatory or optimal before the source record exists.",
          "A useful future comparison should explain trade-offs. An item can be useful for learning, group play, exploration or a particular class without being a universal answer. It should identify the patch, the source, the assumptions and what remains uncertain. That level of detail protects beginners from copying a recommendation that only worked in an earlier build.",
          "For now, keep equipment choices reversible where possible, test one change at a time, and use the official source as the final check. Information will be updated when the evidence supports a real comparison."
        ]
      },
      {
        heading: "Upgrade System",
        paragraphs: [
          "The official store mentions character growth and equipment, but it does not publish a verified upgrade system. This page therefore does not claim an enhancement level, material, success chance, cost, transfer rule or downgrade risk. Those details matter to a beginner and should never be inferred from another game’s crafting or upgrade conventions.",
          "When an upgrade screen becomes documented, record the action in a reproducible way: item state before, action taken, result, resources used, date and source. Separate an observed result from an official rule. One successful test does not prove a universal success chance, and one expensive result does not prove a fixed price.",
          "This process also makes future database entries easier to maintain. A structured record can show the original item, the upgrade state and the source instead of compressing a complicated system into a misleading adjective such as enhanced or best."
        ]
      },
      {
        heading: "How To Get Equipment",
        paragraphs: [
          "The official store references loot but does not provide a verified equipment acquisition table. No claim is made here about dungeons, bosses, quests, shops, crafting, drops, events or rewards. If you see an item after an activity, save the observation and check whether a first-party source says that activity is an official source rather than assuming it is the only route.",
          "A future acquisition entry should name the activity exactly, state any requirement that the source confirms, and record the date and version. It should distinguish ‘can be obtained from’ from ‘was observed after’ and avoid promising a drop chance without published evidence. This is especially important for a database page that may be used as a planning reference by new players.",
          "Until then, the best preparation is to learn the inventory and equipment screens, keep notes, and avoid spending based on a community list presented as official."
        ]
      },
      {
        heading: "Beginner Recommendations",
        paragraphs: [
          "The beginner recommendation for equipment is to understand before optimizing. Read the item description, identify what the game actually shows, and test one change in a safe context. Keep a known option available while you compare a replacement. This helps you learn without turning one unverified report into a long-term rule.",
          "If a friend recommends an item, ask which version, activity and class the recommendation assumes. Mark the claim as community advice until an official source confirms it. The Equipment Database can then remain a reliable place to check whether a record has crossed from observation to verification.",
          "A cautious routine is not slow or unhelpful. It prevents wasted resources, makes later comparisons clearer and gives the site a high-quality foundation for when official SpiritVale equipment information is released. It also gives returning players a consistent way to compare a patch change, a newly documented item and an older observation without confusing the dates.",
          "If a system is unclear, write down the question before searching for an answer. That small habit reduces confirmation bias: you can compare the official wording with your expectation instead of selecting the first familiar explanation. A future equipment entry can then answer the question precisely, cite its source and explain what remains unknown."
        ]
      }
    ],
    faq: [
      { question: "Are any SpiritVale equipment entries verified?", answer: "Fifty Equipment pilot records are partially verified against a registered community source. They are not official developer records, and unsupported fields remain marked as unverified." },
      { question: "Which equipment is best for beginners?", answer: "No official best-equipment ranking is confirmed yet. Test options carefully and keep choices flexible." },
      { question: "What equipment stats are confirmed?", answer: "The pilot records preserve stat text published by the registered community source. They are labelled partially verified; the official source set does not confirm a complete stat system." },
      { question: "How is equipment upgraded?", answer: "A complete upgrade system is not yet documented in the current source set." },
      { question: "Where do equipment items come from?", answer: "The pilot records include source-listed drop or crafting evidence where it is published. Treat it as community evidence, not an official universal acquisition table." },
      { question: "When will the Equipment Database be updated?", answer: "There is no fixed schedule. Information will be updated when official SpiritVale sources confirm individual equipment records." }
    ],
    links: [
      { label: "SpiritVale Cards Database", href: "/database/cards/" },
      { label: "SpiritVale Beginner Guide", href: "/guides/beginner-guide/" },
      { label: "SpiritVale Knight Class Guide", href: "/classes/knight/" },
      { label: "SpiritVale Database", href: "/database/" },
      { label: "SpiritVale Skills Database", href: "/database/skills/" }
    ]
  }
};

type DatabaseProfile = {
  id: string;
  label: string;
  singular: string;
  focus: string;
  pending: string;
  beginner: string;
};

const additionalDatabaseProfiles: DatabaseProfile[] = [
  { id: "artifacts", label: "Artifacts", singular: "artifact", focus: "how artifacts may connect character customization with the wider progression system", pending: "artifact names, effects, rarity, slots, acquisition and upgrade rules", beginner: "read the collection screen and record exact wording before treating a visual as a rule" },
  { id: "bosses", label: "Bosses", singular: "boss", focus: "how a reliable boss reference should separate a named encounter from assumptions about health or drops", pending: "boss names, locations, phases, rewards, skills and difficulty", beginner: "treat an encounter as an observation and verify its name or rule against an official source" },
  { id: "maps", label: "Maps", singular: "map", focus: "how a map index can help players orient themselves without inventing coordinates or routes", pending: "map names, zones, entrances, coordinates, biomes and dungeon connections", beginner: "note the official name of a place and keep route observations separate from verified map data" },
  { id: "monsters", label: "Monsters", singular: "monster", focus: "how a monster index can document encounters without claiming unverified drops or combat values", pending: "monster names, types, locations, drops, resistances and combat values", beginner: "record what appears in the current game and wait for a source before publishing a species fact" },
  { id: "skills", label: "Skills", singular: "skill", focus: "how a skill index can make character research clearer while preserving exact source wording", pending: "skill names, effects, costs, cooldowns, requirements and class relationships", beginner: "save the complete tooltip and the version in which it was observed" }
];

function makeDatabaseLandingContent(profile: DatabaseProfile): SeoLandingContent {
  const { label, singular } = profile;
  return {
    h1: `SpiritVale ${label} Database - Complete ${label} List`,
    title: profile.id === "maps" ? "SpiritVale Maps Database: Complete Map List | PlayAIG" : `SpiritVale ${label} Database: Complete List | PlayAIG`,
    description: `Use the SpiritVale ${label} Database for verified ${singular} records, collection guidance, source status and transparent future updates from PlayAIG today.`,
    sections: [
      {
        heading: "Database Overview",
        paragraphs: [
          `The SpiritVale ${label} Database is a dedicated landing page for ${profile.focus}. The formal collection currently has no verified individual ${singular} entries, so this page does not fill the screen with invented names, numbers or rankings. It tells a player exactly what is being tracked, what the current status means and how a future record will earn a place in the collection.`,
          `An empty collection is useful when it is explicit. The official source set mentions a broad game world and systems such as combat, progression, equipment and exploration, but it does not provide a complete ${label.toLowerCase()} catalogue. Information will be updated when a registered first-party source confirms a claim.`
        ]
      },
      {
        heading: "Data Categories",
        paragraphs: [
          `The formal ${label} collection is reserved for records that can be identified precisely. At the moment, ${profile.pending} remain open. A familiar genre category is not enough to create a database field because it may imply a mechanic SpiritVale does not use or describe differently.`,
          `When official material adds a category, the page can preserve the exact wording, source owner, access date and verification status. That makes the collection easier to audit and prevents a player observation from silently becoming an official fact. Future categories should also explain what they do not cover, so a missing value is not mistaken for zero or unavailable content.`
        ],
        bullets: ["Verified individual records: none currently available.", `Pending documentation: ${profile.pending}.`, "Evidence rule: use a registered official source for each factual claim."]
      },
      {
        heading: "How To Obtain",
        paragraphs: [
          `No verified acquisition table is available for SpiritVale ${label.toLowerCase()}. This page therefore does not claim a quest, dungeon, boss, shop, crafting recipe, event or drop source for a ${singular}. If the game shows an item or encounter after an activity, save the observation and check whether an official source identifies that activity as an intended source.`,
          `A future acquisition record should name the activity exactly, list only confirmed requirements, distinguish ‘observed after’ from ‘can be obtained from’, and include the version and source. It should not promise a drop chance or a single route unless the first-party material supports that level of precision.`
        ]
      },
      {
        heading: "Usage Guide",
        paragraphs: [
          `To use this database, start with the verification badge and current status. If the page says Data Collection In Progress, there are no public records to compare. Use the registered official source for direct confirmation, then return here when a named record becomes available. This sequence helps a beginner distinguish a real empty collection from a page that has simply failed to load.`,
          `For your own notes, ${profile.beginner}. Record date, activity, exact text and context. Keep a personal observation separate from a verified database entry until the source supports it. That habit makes future filtering and internal links more trustworthy.`
        ]
      },
      {
        heading: "Best Recommendations",
        paragraphs: [
          `There is no verified best ${singular} recommendation yet. A recommendation requires a named record, a documented effect or property, a defined goal and enough context to explain trade-offs. Without those inputs, a tier list would be a guess that could send a player toward an unavailable or incorrectly described option.`,
          `When records arrive, recommendations should state the source, version, situation and reason. A ${singular} can be useful for exploration without being best for combat, or important for one class without being universal. The database will keep that distinction visible instead of collapsing it into a single score.`
        ]
      },
      {
        heading: "Related Guides",
        paragraphs: [
          `The strongest way to understand a still-growing database is to connect it to a practical guide. Beginner players can learn the confirmed systems first, class readers can research how their choices might relate to future ${label.toLowerCase()} records, and the wider Database index shows which collections are still awaiting official information.`,
          `These links are intentionally contextual rather than promotional. They help a reader move from a search question to the right next page without creating a second data source or duplicating formal records. The same source and verification rules apply across Guides, Classes and Database pages.`
        ]
      }
    ],
    faq: [
      { question: `Are any SpiritVale ${label.toLowerCase()} entries verified?`, answer: `No verified ${singular} entries are currently available in the formal PlayAIG collection.` },
      { question: `What ${singular} information is confirmed?`, answer: `The collection is awaiting official details. ${profile.pending.charAt(0).toUpperCase() + profile.pending.slice(1)} are not currently verified.` },
      { question: `How do I use the ${label} Database?`, answer: `Check the verification status, read the registered source and use future records only when their details are officially confirmed.` },
      { question: `Which ${singular} is best?`, answer: `No ranking is published because there are no verified records and comparison criteria yet.` },
      { question: `When will the ${label} Database be updated?`, answer: `There is no fixed schedule. Information will be updated when official SpiritVale sources confirm individual records.` }
    ],
    links: [
      { label: "SpiritVale Beginner Guide", href: "/guides/beginner-guide/" },
      { label: "SpiritVale Class Guide", href: "/guides/class-guide/" },
      { label: "SpiritVale Knight Class Guide", href: "/classes/knight/" },
      { label: "SpiritVale Equipment Database", href: "/database/equipment/" },
      { label: "SpiritVale Database", href: "/database/" }
    ]
  };
}

for (const profile of additionalDatabaseProfiles) databaseLandingContent[profile.id] = makeDatabaseLandingContent(profile);

// Map searchers currently have a high-ranking, low-CTR query but no verified
// map entity records. Make that boundary explicit above the generic guidance,
// while giving the searcher useful next steps through existing pages.
const mapsLanding = databaseLandingContent.maps;
if (mapsLanding) {
  mapsLanding.sections.splice(1, 0, {
    heading: "SpiritVale Map Search",
    paragraphs: [
      "If you searched for a SpiritVale map, this page is the source-aware starting point for map names, zones, entrances and route documentation. The current collection has no verified individual map records, so it does not publish invented coordinates, dungeon routes or region labels.",
      "Use the linked guides to learn the confirmed game systems while map evidence is being collected. When an official source names a region or route, the record will be added with its source, review date and limits instead of presenting a player observation as a universal map."
    ],
    bullets: [
      "Verified map entities currently listed: none.",
      "Pending evidence: names, regions, entrances, coordinates and dungeon connections.",
      "Update rule: publish a map record only after a registered source confirms it."
    ]
  });
  mapsLanding.links = [
    ...mapsLanding.links,
    { label: "SpiritVale Database", href: "/database/" },
    { label: "SpiritVale Leveling Guide", href: "/guides/leveling-guide/" }
  ];
}

type GuideProfile = {
  slug: string;
  topic: string;
  title: string;
  description: string;
  confirmed: string;
  method: string;
  caution: string;
};

const additionalGuideProfiles: GuideProfile[] = [
  {
    slug: "card-system-guide",
    topic: "Card System",
    title: "SpiritVale Card System Guide 2026: Complete Tips | PlayAIG",
    description: "Learn the SpiritVale card system, gear customization context, evidence limits, research steps and future card updates in this PlayAIG guide.",
    confirmed: "The official Steam material identifies cards and artifacts as character-build features and says the card system can customize gear.",
    method: "save exact card wording, the screen where it appears and the version in which it was observed",
    caution: "no card effect, rarity, drop table or tier list is currently verified"
  },
  {
    slug: "leveling-guide",
    topic: "Leveling",
    title: "SpiritVale Leveling Guide 2026: Complete Tips | PlayAIG",
    description: "Use this SpiritVale leveling guide for confirmed progression systems, safe early planning, equipment context and source-led updates from PlayAIG.",
    confirmed: "Official SpiritVale information says players can level characters and mentions skill progression, class switching, equipment, loot, combat and multiplayer.",
    method: "record the activity, character state, date and observed change before calling a route or reward a rule",
    caution: "no fastest route, level cap, experience formula or level table is currently verified"
  },
  {
    slug: "stats-guide",
    topic: "Stats",
    title: "SpiritVale Stats Guide 2026: Complete Review | PlayAIG",
    description: "Review SpiritVale character and equipment stats with source boundaries, refining context, research steps and transparent PlayAIG updates for players.",
    confirmed: "Official material discusses characters, equipment, upgrades, loot, skills, cards and artifacts, but does not publish individual stat names or formulas.",
    method: "capture the complete tooltip, condition, version and source before treating a value as a verified stat",
    caution: "no attribute formula, soft cap, primary stat or reset rule is currently verified"
  }
];

function makeGuideLandingContent(profile: GuideProfile): SeoLandingContent {
  const { topic } = profile;
  return {
    h1: `SpiritVale ${topic} Guide 2026`,
    title: profile.title,
    description: profile.description,
    sections: [
      {
        heading: "Introduction",
        paragraphs: [
          `${profile.confirmed} That statement gives a player a useful starting point, but it does not answer every practical question. This landing page explains how to investigate ${topic.toLowerCase()} without turning a broad system description into invented numbers, names or rankings.`,
          `SpiritVale is described as an Early Access class-based action MMO, so a good guide needs both practical direction and a clear update boundary. It should tell a new player what to read first, what to record and which claims still need a first-party source. ${profile.caution.charAt(0).toUpperCase() + profile.caution.slice(1)}.`
        ]
      },
      {
        heading: "Step By Step Guide",
        paragraphs: [
          `Begin by reading the current in-game screen and the registered official source together. ${profile.method}. Write down the exact phrase rather than paraphrasing it into a familiar genre term. Then identify whether the observation is a system reference, a named record, a numeric value or a personal interpretation.`,
          `Next, test one change at a time if the game allows it. Keep the activity and character state stable, record the result and avoid announcing a universal rule after one test. Finally, compare the note with official updates and return to this page when a claim crosses from observation into verified information.`
        ],
        bullets: ["Read the full tooltip or official wording.", "Record date, version and context.", "Separate observation, source and interpretation.", "Recheck after official updates."]
      },
      {
        heading: "Early Game Strategy",
        paragraphs: [
          `A low-regret early strategy for ${topic.toLowerCase()} is to learn the interface before spending resources. Explore the relevant screen, understand which choices are reversible and keep a known option available while testing a replacement. This produces useful knowledge without requiring a speculative tier list or a hidden formula.`,
          `Use cooperative play and the broader Beginner Guide for context, but do not assume that another player’s route applies to every class or patch. If a recommendation depends on a class, link to the Class Guide and check the formal class record. If it depends on equipment or cards, use the corresponding Database page and wait for verified entries.`
        ]
      },
      {
        heading: "Common Mistakes",
        paragraphs: [
          `The first mistake is filling an evidence gap with a familiar genre pattern. A card color may look like rarity, a number may look like a primary stat, or a reward may appear to be a guaranteed drop. Those impressions are useful questions, not verified SpiritVale facts.`,
          `The second mistake is removing update context. Early Access wording and balance can change, so keep the version and reviewed date with important observations. The third is treating a community explanation as official. Community research can be valuable, but this site labels it separately and adds formal records only when a registered first-party source supports the claim.`
        ]
      },
      {
        heading: "Advanced Tips",
        paragraphs: [
          `Advanced readers can improve the quality of future ${topic.toLowerCase()} data by collecting reproducible evidence. Use the same activity, compare one variable, preserve exact text and note what the source does not say. This makes later changes easier to detect and prevents an old observation from becoming a timeless rule.`,
          `When an official update arrives, classify it as a new feature, a balance change or a clarification. Update the narrowest supported sentence first, then connect it to the relevant Class or Database page. A small, sourced improvement is more useful for searchers than a large page that hides uncertainty.`
        ]
      },
      {
        heading: "Related Pages",
        paragraphs: [
          `Use the links below to move from ${topic.toLowerCase()} research to the surrounding topic cluster. Guides explain confirmed systems, Classes organize the seven base-class records, and Database pages show which collections are ready for verified entries. No second data source is created by these links; all formal facts continue to come from the existing records and sources.`,
          `If your question is not answered, mark it as an open question instead of inventing a result. Information will be updated when official SpiritVale material makes the answer verifiable.`
        ]
      }
    ],
    faq: [
      { question: `What does the SpiritVale ${topic} system confirm?`, answer: profile.confirmed },
      { question: `Does this guide list unverified ${topic.toLowerCase()} data?`, answer: `No. ${profile.caution.charAt(0).toUpperCase() + profile.caution.slice(1)}; information will be updated when official details are confirmed.` },
      { question: `How should beginners research ${topic.toLowerCase()}?`, answer: `Read the exact in-game wording, record context and version, test one change at a time and compare the result with a registered official source.` },
      { question: `Can community observations be used as official data?`, answer: "Community observations can guide research, but they are not presented as official data without a registered first-party source." },
      { question: `When will this guide be updated?`, answer: "There is no fixed schedule. The page will be reviewed when official SpiritVale sources publish verifiable information." }
    ],
    links: [
      { label: "SpiritVale Beginner Guide", href: "/guides/beginner-guide/" },
      { label: "SpiritVale Class Guide", href: "/guides/class-guide/" },
      { label: "SpiritVale Knight Class Guide", href: "/classes/knight/" },
      { label: "SpiritVale Cards Database", href: "/database/cards/" },
      { label: "SpiritVale Equipment Database", href: "/database/equipment/" }
    ]
  };
}

for (const profile of additionalGuideProfiles) guideLandingContent[profile.slug] = makeGuideLandingContent(profile);

export const classLandingContent: Record<string, SeoLandingContent> = {
  knight: {
    h1: "SpiritVale Knight Class Guide 2026",
    title: "SpiritVale Knight Class Guide 2026: Build Guide | PlayAIG",
    description: "Read the SpiritVale Knight guide for confirmed class identity, build research, skill and equipment questions, leveling notes and PlayAIG updates.",
    sections: [
      {
        heading: "Knight Class Overview",
        paragraphs: [
          "Knight is one of the seven base-class names recorded in the formal SpiritVale data and supported by the registered official Steam source. That is the confirmed foundation of this page. The current source does not assign Knight a role, weapon, main stat, difficulty, skill list, strength, weakness or progression route. This guide therefore explains how to research the class without turning a familiar fantasy label into an invented mechanic.",
          "The Knight page is most useful when you need a clear answer to ‘what is known right now?’ It confirms the name and base-class identity, points you to related guides, and marks future details as pending. As official information grows, the same page can add precise skills or equipment records while preserving the evidence behind each claim."
        ]
      },
      {
        heading: "Knight Skills",
        paragraphs: [
          "Official SpiritVale material refers to skill trees, but no individual Knight skill is stored with a verified source in the current data. This means a responsible Knight skills section cannot list names, damage, cooldowns, resource costs or recommended order. If a skill appears in the client, record the exact wording and context, then wait for a first-party source before presenting it as a confirmed Knight skill.",
          "When skill records arrive, compare them by evidence rather than by a single number. A useful entry should explain what the skill does, its conditions, its source, the version checked and whether the wording applies specifically to Knight. A community tooltip or screenshot can be a lead for research, not a substitute for verification.",
          "For now, learn the skill interface and note which questions you want answered. That preparation lets you recognize a meaningful official update without committing to a fictional rotation."
        ]
      },
      {
        heading: "Knight Strengths and Weaknesses",
        paragraphs: [
          "No official strengths or weaknesses are currently confirmed for Knight. The name may suggest a defensive or close-range identity, but that interpretation is not a data record. Publishing it as fact would mislead a new player about positioning, survivability or party expectations. The correct current statement is that these details have not yet been confirmed by official SpiritVale sources.",
          "A future strengths-and-weaknesses comparison should be tied to documented mechanics and a defined situation. For example, a source might establish a skill interaction or equipment requirement; the guide could then explain the benefit and trade-off without claiming universal superiority. Until that evidence exists, compare your own experience as observation and label it clearly.",
          "This boundary is especially important in cooperative play. A party should not assume that Knight must perform a particular job solely because the class name sounds familiar. Ask, observe and verify."
        ]
      },
      {
        heading: "Best Knight Build",
        paragraphs: [
          "There is no verified Knight build yet. A build needs confirmed skills, equipment, stats, progression conditions and a goal such as solo play, cooperative combat or exploration. None of those individual Knight fields is currently supported by a complete first-party record. This page will not publish a fabricated stat spread or call a community setup the official best build.",
          "A responsible build research loop is still possible. Define the goal, list the options that the game actually shows, change one variable, observe the result and save the source or version. If a recommendation comes from another player, mark it as community advice and ask which patch it targets. This turns build research into a testable process instead of an unsupported promise.",
          "When official data arrives, the Knight guide can evolve into a real build page with source-backed skills, equipment, trade-offs and update notes. Until then, flexibility is the safest recommendation."
        ]
      },
      {
        heading: "Recommended Equipment",
        paragraphs: [
          "The official store mentions equipment as part of character growth, but no Knight equipment assignment is confirmed. Do not assume that Knight uses a particular weapon, armor class or stat priority. Check the Equipment Database for collection status, inspect current in-game descriptions, and keep any personal observation separate from a verified recommendation.",
          "A future equipment recommendation should state why an item fits Knight, what it changes, which version was tested and what source supports it. It should also acknowledge trade-offs. An item can be useful for learning or a specific activity without being the best universal choice.",
          "For now, test equipment carefully, avoid irreversible spending based on genre expectations, and return to this page when an official source confirms a Knight interaction."
        ]
      },
      {
        heading: "Leveling Strategy",
        paragraphs: [
          "SpiritVale’s official materials mention character growth and leveling, but they do not publish a Knight-specific experience curve, route or unlock order. No fastest leveling strategy can therefore be verified. The useful approach is to learn the game’s progression language, record what changes after a level and avoid treating a community route as universal.",
          "Keep notes with date, activity, class state and observed outcome. Recheck them after an Early Access update because pacing and unlocks can change. If an official source later documents a Knight milestone, update the strategy with the exact condition instead of filling the remaining gaps with assumptions.",
          "Leveling also has a social dimension. The official store describes cooperative combat and multiplayer parties, so group sessions can help you understand how Knight is presented in practice. They do not prove an official role, but they can give you useful questions to verify."
        ]
      },
      {
        heading: "Knight Gameplay Tips",
        paragraphs: [
          "The safest Knight gameplay tip is to treat the first sessions as structured research. Learn the controls, observe how the character screen describes the class, and test one decision at a time. Do not promise that Knight blocks, taunts, protects allies or deals a particular type of damage unless an official source confirms that mechanic.",
          "In a party, communicate your uncertainty instead of assigning yourself a role from the name alone. Ask teammates what the current encounter expects, watch the documented effects of your actions, and keep an eye on official updates. This is more useful than copying a generic MMO tank script that may not match SpiritVale.",
          "A good tip remains valuable after a patch. Learning to read tooltips, record versions and verify sources is a durable Knight skill even while the individual ability list is still pending."
        ],
        bullets: ["Do not infer Knight’s role from its name.", "Test one skill or equipment change at a time when possible.", "Record patch context before sharing a recommendation.", "Use the official source for final verification."]
      }
    ],
    faq: [
      { question: "Is Knight an officially confirmed SpiritVale class?", answer: "Yes. Knight is recorded as one of the seven officially confirmed SpiritVale base classes." },
      { question: "What weapon does Knight use?", answer: "No weapon assignment is currently confirmed by the registered official sources." },
      { question: "What are Knight’s skills?", answer: "No individual Knight skills are currently verified in the formal data. Information will be updated when official details are confirmed." },
      { question: "What is the best Knight build?", answer: "No official Knight build is available yet because skills, equipment, stats and progression details are not confirmed." },
      { question: "Is Knight a tank class?", answer: "That role has not been confirmed. The class name alone is not evidence of a tank, damage or support role." },
      { question: "Where should Knight players find updates?", answer: "Check the registered official SpiritVale Steam source and this page’s verification status for future updates." }
    ],
    links: [
      { label: "SpiritVale Class Guide", href: "/guides/class-guide/" },
      { label: "SpiritVale Beginner Guide", href: "/guides/beginner-guide/" },
      { label: "SpiritVale Equipment Database", href: "/database/equipment/" },
      { label: "SpiritVale Classes", href: "/classes/" },
      { label: "SpiritVale Skills Database", href: "/database/skills/" }
    ]
  }
};

type ClassProfile = {
  name: string;
  angle: string;
  questions: string;
  beginner: string;
  evidence: string;
};

const additionalClassProfiles: ClassProfile[] = [
  { name: "Acolyte", angle: "read the class name as an invitation to investigate support, utility or another identity rather than as proof of a role", questions: "whether its skills, equipment and progression have a documented relationship", beginner: "start by learning the interface and recording which choices the game actually exposes", evidence: "the official record confirms the name and Base Class identity, not a healing, support or damage assignment" },
  { name: "Mage", angle: "separate the fantasy of magic from verified SpiritVale mechanics", questions: "which abilities, resources and equipment interactions are actually documented", beginner: "compare the class screen with the official source before investing in any assumed spell pattern", evidence: "the official record confirms the name and Base Class identity, not elemental skills, range or stat priorities" },
  { name: "Summoner", angle: "avoid assuming that the name proves a pet, companion or minion system", questions: "whether any companion rules, skill costs or equipment links are first-party confirmed", beginner: "observe the available menus and keep any companion expectation marked as a question", evidence: "the official record confirms the name and Base Class identity, not a summon roster or playstyle" },
  { name: "Warrior", angle: "test the class without importing a generic melee or damage template", questions: "which combat actions and progression choices belong specifically to Warrior", beginner: "learn movement and combat feedback before copying a weapon or stat recommendation", evidence: "the official record confirms the name and Base Class identity, not a melee role, weapon or difficulty" },
  { name: "Scout", angle: "treat the name as a discovery prompt, not a confirmed speed, ranged or exploration role", questions: "how the current game presents Scout skills, equipment and party context", beginner: "keep early experiments reversible and write down the version behind each observation", evidence: "the official record confirms the name and Base Class identity, not mobility, range or scouting mechanics" },
  { name: "Rogue", angle: "avoid turning a familiar genre label into an assumed stealth, critical-hit or dagger build", questions: "which actions, stats and equipment relationships have a verifiable source", beginner: "focus on controls, readable tooltips and one test at a time", evidence: "the official record confirms the name and Base Class identity, not stealth, damage or weapon rules" }
];

function makeClassLandingContent(profile: ClassProfile): SeoLandingContent {
  const { name } = profile;
  return {
    h1: `SpiritVale ${name} Class Guide 2026`,
    title: `SpiritVale ${name} Class Guide 2026: Build Guide | PlayAIG`,
    description: `Read the SpiritVale ${name} class guide for confirmed identity, skills, build research, equipment questions, sources and beginner tips from PlayAIG.`,
    sections: [
      {
        heading: "Class Overview",
        paragraphs: [
          `${name} is one of the seven base-class names recorded in the formal SpiritVale data and supported by the registered official Steam source. This guide uses that narrow fact as its foundation. It helps a player ${profile.angle}, while keeping every unconfirmed role, weapon, stat and progression claim visible rather than hiding uncertainty behind confident wording.`,
          `A useful ${name} overview answers what the source establishes, what the current page does not know, and how to research the next question. The official material describes a class-based action MMO with cooperative combat, but it does not publish a complete ${name} handbook. The page therefore remains useful without pretending that a genre convention is a SpiritVale rule.`
        ]
      },
      {
        heading: "Skills",
        paragraphs: [
          `No individual ${name} skill is currently stored with a complete first-party record. The official material refers to skill trees, which confirms that skills are part of the broader class system, but it does not give this page a verified list of names, effects, cooldowns, costs or unlock order. ${profile.questions} are still open research questions.`,
          `When a skill appears in the client, record its exact text, the screen where it appears, the date and the version. A player observation can guide research, but a public database entry needs a registered official source. This distinction keeps a ${name} skill section accurate when Early Access wording or balance changes.`
        ]
      },
      {
        heading: "Best Build",
        paragraphs: [
          `There is no verified best ${name} build yet. A real build needs confirmed skills, equipment, stats, progression conditions and a defined goal such as solo play or cooperative combat. Those fields remain unconfirmed, so a stat spread or rotation would be a guess. The practical recommendation is to define a goal, list what the game shows and test one change at a time.`,
          `If another player shares a ${name} setup, treat it as an experiment and ask which patch, activity and assumptions it uses. Record the result separately from official facts. This lets the guide grow into a source-backed build page later without presenting a temporary community idea as a permanent answer.`
        ]
      },
      {
        heading: "Recommended Equipment",
        paragraphs: [
          `The official store mentions equipment and character growth, but no equipment assignment is verified for ${name}. Do not assume a weapon, armor family, slot or stat priority from the class name. Use the Equipment Database to check collection status, inspect current descriptions in-game and keep an observation labelled as an observation until a first-party source confirms the interaction.`,
          `A future recommendation should state the item, version, reason it fits ${name}, trade-offs and source. It should also explain whether the recommendation applies to a specific activity rather than every player. Until that evidence exists, flexibility is safer than an invented best-in-slot list.`
        ]
      },
      {
        heading: "Strengths",
        paragraphs: [
          `No official strength profile is currently confirmed for ${name}. ${profile.evidence}. That boundary matters because players often use a class name to predict party value or damage. A useful strength claim must point to a documented mechanic and a situation in which that mechanic matters.`,
          `You can still record what feels clear or enjoyable in your own session. Note the activity, character state and version, then describe it as a personal observation. This gives future official notes something precise to confirm without turning a single encounter into a universal ranking.`
        ]
      },
      {
        heading: "Weaknesses",
        paragraphs: [
          `No official weakness profile is confirmed either. Avoid claims about fragility, resource cost, range, mobility or party dependence unless a first-party source documents them. A weakness is meaningful only in relation to a mechanic and a goal; a familiar class stereotype is not enough.`,
          `For beginner research, ask what feels difficult and whether the difficulty comes from the class, the encounter, the interface or a missing explanation. That question is more actionable than copying a generic tier list. Information will be updated when official SpiritVale material confirms a ${name} limitation or trade-off.`
        ]
      },
      {
        heading: "Beginner Tips",
        paragraphs: [
          `The safest beginner plan is to ${profile.beginner}. Read tooltips, save patch context and avoid irreversible spending while the class record is still small. In cooperative sessions, tell teammates what you are testing instead of promising a role based on the name alone.`,
          `A repeatable routine is more valuable than a speculative route: observe one system, test one change, write down the result and check the registered official source. This method helps ${name} players learn quickly while keeping the public guide honest.`
        ],
        bullets: ["Do not infer a role from the class name.", "Test one decision at a time when possible.", "Record version and source context.", "Use official updates as the final verification step."]
      }
    ],
    faq: [
      { question: `Is ${name} an officially confirmed SpiritVale class?`, answer: `Yes. ${name} is recorded as one of the seven confirmed SpiritVale base classes.` },
      { question: `What role does ${name} have?`, answer: `No role is currently confirmed by the registered official sources. The class name alone is not evidence of a role.` },
      { question: `What weapon does ${name} use?`, answer: `No weapon assignment is currently stored as verified official data.` },
      { question: `What is the best ${name} build?`, answer: `No official build is available yet because skills, equipment, stats and progression details are not confirmed.` },
      { question: `Where can I find ${name} updates?`, answer: `Check the registered official SpiritVale Steam source and this page’s verification status for future updates.` }
    ],
    links: [
      { label: "SpiritVale Class Guide", href: "/guides/class-guide/" },
      { label: "SpiritVale Beginner Guide", href: "/guides/beginner-guide/" },
      { label: "SpiritVale Skills Database", href: "/database/skills/" },
      { label: "SpiritVale Equipment Database", href: "/database/equipment/" },
      { label: "SpiritVale Classes", href: "/classes/" }
    ]
  };
}

for (const profile of additionalClassProfiles) classLandingContent[profile.name.toLowerCase()] = makeClassLandingContent(profile);

// Class-specific links are added only where the existing source-backed skill
// records explicitly identify the class. No role, build ranking or mechanic is
// inferred from the class name.
const knightLanding = classLandingContent.knight;
if (knightLanding) {
  knightLanding.sections.push({
    heading: "Verified Knight-Related Records",
    paragraphs: [
      "The current skill collection contains one community-sourced record whose class relation is explicitly stored as Knight: Air Cutter. That relationship confirms a database link, not a role, rotation, damage value or recommended build.",
      "Open the skill record to review its source and field status. Any missing cooldown, cost or scaling detail remains unavailable until the registered source documents it."
    ],
    bullets: ["Air Cutter is the only currently linked Knight skill record.", "Community evidence is not official developer confirmation.", "No Knight role or best-build claim is inferred."]
  });
  knightLanding.links = [
    ...knightLanding.links,
    { label: "Air Cutter Skill", href: "/database/skills/air-cutter/" }
  ];
}

const warriorLanding = classLandingContent.warrior;
if (warriorLanding) {
  warriorLanding.sections.splice(3, 0, {
    heading: "Warrior Build Research",
    paragraphs: [
      "Searchers looking for a SpiritVale Warrior build can use this section as a source-backed research checklist. The current data links Warrior to four community-sourced skill records—Bash, Whirlwind, Axe Mastery and Axe Quicken—but it does not establish a best rotation, stat priority, equipment set or damage ranking.",
      "Compare those records with the Equipment and Cards databases, keep the source and version visible, and treat any setup as an experiment until official SpiritVale documentation confirms the mechanics. Information will be updated when verified build evidence is available."
    ],
    bullets: [
      "Linked records: Bash, Whirlwind, Axe Mastery and Axe Quicken.",
      "No best-build, DPS or stat-priority claim is published.",
      "Use the Class Guide and Beginner Guide for broader planning context."
    ]
  });
  warriorLanding.links = [
    ...warriorLanding.links,
    { label: "Bash Skill", href: "/database/skills/bash/" },
    { label: "Whirlwind Skill", href: "/database/skills/whirlwind/" },
    { label: "Axe Mastery Skill", href: "/database/skills/axe-mastery/" },
    { label: "Axe Quicken Skill", href: "/database/skills/axe-quicken/" },
    { label: "SpiritVale Cards Database", href: "/database/cards/" }
  ];
}

export function getGuideLandingContent(slug: string) {
  return guideLandingContent[slug];
}

export function getDatabaseLandingContent(id: string) {
  return databaseLandingContent[id];
}

export function getClassLandingContent(slug: string) {
  return classLandingContent[slug];
}
