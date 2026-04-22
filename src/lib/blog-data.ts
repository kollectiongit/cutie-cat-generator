export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  longExcerpt: string;
  date: string;
  readTime: string;
  emoji: string;
  extraCute: boolean;
  tags: string[];
};

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title:
      "Les minous tigrés : pourquoi ils font fondre le cœur en deux secondes",
    excerpt:
      "Entre leurs zébrures toutes douces et leurs coussinets, les chats tigrés restent des stars du mignon dès l’aube du monde.",
    longExcerpt:
      "Les chats tigrés, avec leurs marques de crayon d’enfant, ont ce petit côté sauvage tout en restant bons pâtissiers du canapé. Ils aiment s’étirer, faire du pain sur ta veste, puis te lancer un regard de victoire. C’est mignon, c’est injuste, et c’est exactement ce qu’on aime : la douceur qui te rend faible, avec les moustaches en plus.",
    date: "2 avr. 2026",
    readTime: "4 min",
    emoji: "🐯",
    extraCute: true,
    tags: ["pelage", "câlins"],
  },
  {
    id: "2",
    title: "Bébés chats : la science du « trop mignon, j’en peux plus »",
    excerpt:
      "Ces toutes petites pattes, ces yeux de billes… Les chatons activeraient le même cerveau que le chocolat chaud.",
    longExcerpt:
      "Les chercheurs s’entendent : face à un chaton, on bascule rapidement en mode protecteur, voix aigrelette incluse. Leurs bêtises mignonnes (culbuter sur une pelote, rater un saut) sont des raccourcis direct vers le cœur. C’est bête, c’est mignon, et c’est reproductible à l’infini en vidéo (danger).",
    date: "18 mars 2026",
    readTime: "5 min",
    emoji: "🍼",
    extraCute: true,
    tags: ["chaton", "science douce"],
  },
  {
    id: "3",
    title: "Les chats ronds : manifeste pour l’amour des boules de polaire",
    excerpt:
      "Un minou rond, c’est la promesse d’un câlin chaud, d’un ronron grave et d’un panier qui tient toute l’amitié du monde.",
    longExcerpt:
      "Ils ne font pas d’apologie : ils s’affichent en rondins de tendresse. Leur silhouette moelleuse rassure, leur démarche tranquille rappelle de ralentir, et leurs câlins sont d’excellents antistress. Ici, on célèbre le rond avec des étoiles, des cœurs, et beaucoup de laine pour les photos.",
    date: "1 mars 2026",
    readTime: "3 min",
    emoji: "⭕",
    extraCute: false,
    tags: ["bien-être", "ronron"],
  },
  {
    id: "4",
    title: "Gros yeux, petit museau : l’anatomie du mignon (version chat)",
    excerpt:
      "Museau en triangle, grands yeux, oreilles légèrement en avant : c’est le combo « adoption immédiate » en format félin.",
    longExcerpt:
      "D’où vient ce p’tit visage ? C’est un mélange de traits juvéniles : front large, mâchoire fine, et ce regard de « j’ai rien fait (presque) ». Les chats mignons usent de cette carte sociale honteusement, et on sourit, à chaque fois, comme des humains conquis.",
    date: "20 févr. 2026",
    readTime: "6 min",
    emoji: "🥹",
    extraCute: true,
    tags: ["anatomie mignonne", "yeux"],
  },
  {
    id: "5",
    title: "Les chats paresseux, champions du câlin fainéant",
    excerpt:
      "Quand le minou choisit ta chemise et ton agenda pour s’y installer, c’est un compliment suprême, avec point bonus cuteness.",
    longExcerpt:
      "La paresse mignonne, c’est celle du chat qui t’inspire de poser l’iPad et de t’allonger cinq minutes de plus. Son corps en boudin, ses paupières lourdes, le calme de son ronron : tout invite à lâcher prise, dans un cocon de douceur à poils. Objectif ressenti : 100 % confort, 0 % mauvaise foi.",
    date: "3 févr. 2026",
    readTime: "4 min",
    emoji: "🛋️",
    extraCute: false,
    tags: ["détente", "câlins partagés"],
  },
  {
    id: "6",
    title: "Duo mignon : quand deux chats s’adorent un peu trop fort",
    excerpt:
      "Câlins croisés, têtes frotées, siestes mêlées : le spectacle en duo reste l’un des mignonums les plus puissants du net.",
    longExcerpt:
      "Deux chats s’entraiment dans la mignonnerie. L’un râle, l’autre ignore avec élégance ; puis ils se réconcilient en quelques lèchages bruyants. On filme, on re-regarde, on en parle. C’est attendrissant, un peu bête, profondément réconfortant, et c’est toute l’histoire des duos félins mignons.",
    date: "15 janv. 2026",
    readTime: "5 min",
    emoji: "💕",
    extraCute: true,
    tags: ["duo", "attendrissement"],
  },
  {
    id: "7",
    title:
      "Croquettes, festin et petit drame : l’art de nourrir un chat heureux",
    excerpt:
      "Un chat heureux ne demande pas la lune, juste de bonnes croquettes, de l’eau fraîche et le droit d’agir comme un critique gastronomique insupportable.",
    longExcerpt:
      "Pour rendre un chat heureux, on commence souvent par son domaine préféré : manger comme un prince minuscule dans un corps de coussin vivant. Une nourriture adaptée, une gamelle propre, un peu de variété, et surtout des horaires assez réguliers peuvent déjà transformer son quotidien. Le chat adore faire semblant d’être incompris devant une gamelle à moitié pleine, mais au fond, ce qu’il aime vraiment, c’est la sécurité d’un petit rituel délicieux. Bonus émotionnel si tu lui parles comme à un chef étoilé pendant qu’il croque.",
    date: "22 avr. 2026",
    readTime: "4 min",
    emoji: "🍽️",
    extraCute: true,
    tags: ["alimentation", "rituels"],
  },
  {
    id: "8",
    title:
      "Le trône, le carton, la boîte : offrir à son chat un vrai palais ridicule",
    excerpt:
      "Ton chat n’a pas besoin d’un château, juste d’un carton bien placé pour régner avec dignité sur ton salon.",
    longExcerpt:
      "Le bonheur félin passe par un détail essentiel : avoir des endroits à lui, même s’ils sont objectivement absurdes. Un panier moelleux, une boîte en carton, une étagère en hauteur ou un plaid au soleil peuvent suffire à faire naître cette expression rare du chat comblé : les yeux mi-clos de l’empereur qui a tout. Plus ton chat peut choisir entre plusieurs coins tranquilles, plus il se sent maître du royaume. Et rien ne vaut sa fierté de s’installer dans le colis que tu viens de recevoir, comme si tu l’avais commandé pour lui depuis toujours.",
    date: "20 avr. 2026",
    readTime: "5 min",
    emoji: "📦",
    extraCute: true,
    tags: ["repos", "territoire"],
  },
  {
    id: "9",
    title:
      "Jouer ou périr d’ennui : pourquoi la canne à plume sauve des vies (morales)",
    excerpt:
      "Un chat qu’on fait jouer, c’est un mini tigre satisfait, un canapé légèrement moins massacré et un foyer globalement plus paisible.",
    longExcerpt:
      "Pour qu’un chat soit heureux, il faut lui donner l’occasion de chasser des trucs imaginaires avec beaucoup trop de sérieux. Les jeux stimulent son instinct, l’aident à se dépenser et évitent qu’il transforme tes chevilles en proie surprise à 6 h 12. Une plume qui vole, une balle qui roule, un tunnel qui bruisse : voilà de quoi déclencher une séance sportive pleine de noblesse et de glissades ratées. Quelques minutes par jour suffisent souvent à lui offrir ce mélange parfait de joie, de concentration et de vanité.",
    date: "17 avr. 2026",
    readTime: "4 min",
    emoji: "🎣",
    extraCute: true,
    tags: ["jeu", "énergie"],
  },
  {
    id: "10",
    title:
      "Le soleil sur le bidou : mode d’emploi pour un chat délicieusement content",
    excerpt:
      "Un coin de lumière, un coussin tiède, et ton chat atteint aussitôt un niveau de paix intérieure inaccessible au reste de l’humanité.",
    longExcerpt:
      "Le chat heureux connaît la valeur d’un rayon de soleil mieux que personne. Il s’y pose comme une pâte feuilletée vivante et entre dans un état méditatif très avancé, entre sieste cosmique et cuisson douce. Lui offrir un accès à une fenêtre lumineuse, un plaid chaud ou un rebord confortable, c’est lui permettre de pratiquer son art préféré : ne rien faire avec excellence. Ce n’est pas de la paresse, c’est de la gestion émotionnelle très pointue, avec moustaches incluses.",
    date: "14 avr. 2026",
    readTime: "3 min",
    emoji: "☀️",
    extraCute: false,
    tags: ["sieste", "confort"],
  },
  {
    id: "11",
    title:
      "Parle-lui comme à un bébé PDG : les mots doux qui rendent un chat joyeux",
    excerpt:
      "Oui, ton chat aime qu’on lui parle. Oui, même avec cette voix ridicule que tu nies utiliser. On sait.",
    longExcerpt:
      "Rendre son chat heureux, ce n’est pas seulement remplir sa gamelle : c’est aussi créer un lien tendre, régulier, rassurant. Beaucoup de chats apprécient qu’on leur parle doucement, qu’on les appelle par leurs petits surnoms absurdes et qu’on accompagne les gestes du quotidien d’une présence calme. Ils ne comprennent pas tout, bien sûr, mais ils sentent très bien l’intention, la douceur et l’attention qu’on leur porte. Et franchement, dire “qui est ce petit ravioli magnifique ?” à un chat assis de travers fait plus de bien au monde qu’on ne le reconnaît assez.",
    date: "11 avr. 2026",
    readTime: "4 min",
    emoji: "🗣️",
    extraCute: true,
    tags: ["relation", "tendresse"],
  },
  {
    id: "12",
    title:
      "Griffoir, gloire et copeaux : laisser son chat être un petit démolisseur légal",
    excerpt:
      "Un chat heureux a le droit de griffer quelque chose d’autorisé, sinon il improvisera sur ton fauteuil avec une créativité vexante.",
    longExcerpt:
      "Faire ses griffes, pour un chat, ce n’est pas de la malveillance : c’est de l’entretien personnel, du sport, de l’expression de soi, presque une carrière. En lui proposant un ou plusieurs griffoirs bien placés, on lui offre un exutoire précieux et très satisfaisant. Certains aiment le carton, d’autres la corde, d’autres encore veulent griffer en hauteur comme de petits artistes contemporains. Lorsqu’il peut étirer tout son long spaghetti de chat en griffant avec conviction, il se sent bien dans ses pattes, et ton mobilier souffle doucement de soulagement.",
    date: "8 avr. 2026",
    readTime: "5 min",
    emoji: "🪵",
    extraCute: false,
    tags: ["griffoir", "bien-être"],
  },
  {
    id: "13",
    title:
      "Litière royale : oui, le bonheur d’un chat passe aussi par ses toilettes",
    excerpt:
      "Ce n’est pas glamour, mais un chat qui approuve sa litière est un chat capable de te regarder avec moins de jugement.",
    longExcerpt:
      "Parlons d’un sujet noble : les toilettes du félin. Une litière propre, accessible, calme et adaptée à ses préférences peut changer énormément son humeur. Le chat aime la dignité, l’intimité et le service impeccable, ce qui fait de lui un client redoutable mais cohérent. Si sa litière lui convient, il se sent en sécurité dans son territoire et vit son quotidien avec plus de sérénité. Ce n’est peut-être pas le conseil le plus poétique, mais un minou satisfait de ses petits arrangements intérieurs devient souvent beaucoup plus détendu, et donc encore plus câlin.",
    date: "5 avr. 2026",
    readTime: "4 min",
    emoji: "🧺",
    extraCute: false,
    tags: ["hygiène", "sérénité"],
  },
  {
    id: "14",
    title:
      "Fenêtre, oiseaux et commérages : pourquoi observer dehors rend les chats heureux",
    excerpt:
      "Un chat devant une fenêtre, c’est un petit voisin à moustaches qui suit l’actualité des pigeons avec un engagement total.",
    longExcerpt:
      "Les chats adorent observer le monde sans y participer, comme des critiques culturels perchés. Installer un accès sécurisé à une fenêtre leur permet de regarder les oiseaux, les feuilles, les passants et tous les drames minuscules de l’extérieur. Cette stimulation visuelle nourrit leur curiosité, les occupe et leur offre des moments de contemplation très sérieux. On les voit alors se redresser, claquer discrètement des dents ou remuer le bout de la queue comme de petits documentaristes surexcités. C’est simple, mignon, et très efficace pour enrichir leur journée.",
    date: "1 avr. 2026",
    readTime: "4 min",
    emoji: "🪟",
    extraCute: true,
    tags: ["curiosité", "environnement"],
  },
  {
    id: "15",
    title:
      "Respecter le grand mystère : parfois, rendre son chat heureux, c’est le laisser tranquille",
    excerpt:
      "Tous les chats n’ont pas envie d’un câlin maintenant, tout de suite, juste parce que toi oui. Hélas pour ton besoin de bisous.",
    longExcerpt:
      "Le bonheur d’un chat passe aussi par le respect de son humeur, de ses limites et de son très fort sens du timing personnel. Certains moments appellent le jeu ou les gratouilles, d’autres exigent qu’on admire sa beauté à distance respectable. Savoir lire ses signaux, accepter qu’il parte, lui laisser un espace calme et éviter les manipulations inutiles, c’est lui montrer qu’il est en sécurité avec toi. Et paradoxalement, plus tu respectes son besoin de tranquillité, plus il revient vers toi comme s’il avait lui-même inventé l’affection.",
    date: "28 mars 2026",
    readTime: "5 min",
    emoji: "🫶",
    extraCute: true,
    tags: ["respect", "confiance"],
  },
  {
    id: "16",
    title:
      "Brossage, beauté et prestige : transformer son chat en nuage satisfait",
    excerpt:
      "Un petit brossage bien dosé peut faire de ton chat une star lisse, détendue et légèrement persuadée d’être célèbre.",
    longExcerpt:
      "Selon son pelage et son caractère, beaucoup de chats apprécient les séances de brossage quand elles sont douces, courtes et bien amenées. Cela aide à retirer les poils morts, à limiter les nœuds et à transformer le moment en rituel de soin très chic. Le bon geste, c’est d’y aller avec délicatesse, d’observer sa réaction et de respecter ses zones préférées ou interdites. Quand tout se passe bien, le chat s’étire, ronronne et prend cet air bouleversant de créature entretenue avec amour. Une sorte de spa miniature, sans peignoir mais avec plus de dignité.",
    date: "24 mars 2026",
    readTime: "4 min",
    emoji: "🪮",
    extraCute: true,
    tags: ["soin", "pelage"],
  },
];
