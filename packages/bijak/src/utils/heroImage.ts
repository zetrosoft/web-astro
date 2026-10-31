export interface PostLike {
  id: string;
  data: {
    image?: string;
    category?: string;
    tags?: string[];
  };
}

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

const curatedBank: Record<string, string[]> = {
  enterprise: [
    "photo-1581091226825-a6a2a5aee158",
    "photo-1504917599217-d4dc5ebe6122",
    "photo-1586528116311-ad8dd3c8310d",
    "photo-1553413077-190dd305871c",
    "photo-1454165804606-c3d57bc86b40",
    "photo-1581092160607-ee22621dd758",
    "photo-1581092335397-9583fe92d232",
    "photo-1581092580497-e0d23cbdf1dc",
    "photo-1581092918056-0c4c3acd3789",
    "photo-1565514020179-026b92b84bb6",
    "photo-1513828583688-c52646db42da",
    "photo-1504384308090-c894fdcc538d",
    "photo-1460925895917-afdab827c52f",
    "photo-1551288049-bebda4e38f71",
    "photo-1542744173-8e7e53415bb0",
    "photo-1552664730-d307ca884978",
    "photo-1556761175-5973dc0f32e7",
    "photo-1507679799987-c73779587ccf",
    "photo-1486406146926-c627a92ad1ab",
    "photo-1497366216548-37526070297c",
    "photo-1497215728101-856f4ea42174",
    "photo-1531973576160-7125cd663d86",
    "photo-1573496359142-b8d87734a5a2",
    "photo-1664575602276-acd073f104c1",
    "photo-1578575437130-527eed3abbec",
    "photo-1580674285054-bed31e145f59",
    "photo-1566576912321-d58ddd7a6088",
    "photo-1616401784845-180882ba9ba8"
  ],
  cloud: [
    "photo-1558494949-ef010cbdcc31",
    "photo-1451187580459-43490279c0fa",
    "photo-1544197150-b99a580bb7a8",
    "photo-1526374965328-7f61d4dc18c5",
    "photo-1597852074816-d933c7d2b988",
    "photo-1518770660439-4636190af475",
    "photo-1555066931-4365d14bab8c",
    "photo-1517694712202-14dd9538aa97",
    "photo-1607799279861-4dd421887fb3",
    "photo-1629654297299-c8506221ca97",
    "photo-1526379095098-d400fd0bf935",
    "photo-1504639725590-34d0984388bd",
    "photo-1531297484001-80022131f5a1",
    "photo-1488590528505-98d2b5aba04b",
    "photo-1519389950473-47ba0277781c",
    "photo-1550751827-4bd374c3f58b",
    "photo-1563206767-5b18f218e8de",
    "photo-1573164713988-8665fc963095",
    "photo-1555949963-ff9fe0c870eb",
    "photo-1516116216624-53e697fedbea",
    "photo-1551033406-611cf9a28f67",
    "photo-1542831371-29b0f74f9713",
    "photo-1461749280684-dccba630e2f6",
    "photo-1498050108023-c5249f4df085",
    "photo-1537432376769-00f5c2f4c8d2",
    "photo-1509395176047-4a66953fd231"
  ],
  security: [
    "photo-1563986768609-322da13575f3",
    "photo-1614064641938-3bbee52942c7",
    "photo-1510511459019-5dda7724fd87",
    "photo-1555949963-aa79dcee981c",
    "photo-1563013544-824ae1b704d3",
    "photo-1618005182384-a83a8bd57fbe",
    "photo-1526374870839-e155464bb9b2",
    "photo-1508739773434-c26b3d09e071",
    "photo-1633265486064-086b219458ec",
    "photo-1512941937669-90a1b58e7e9c",
    "photo-1556742049-0cfed4f6a45d"
  ],
  blockchain: [
    "photo-1639762681485-074b7f938ba0",
    "photo-1621416894569-0f39ed31d247",
    "photo-1642104704074-907c0698cbd9",
    "photo-1639322537228-f710d846310a",
    "photo-1640340434855-6084b1f4901c",
    "photo-1622630998477-20aa696ecb05",
    "photo-1618044733300-9472054094ee",
    "photo-1518546305927-5a555bb7020d",
    "photo-1605792657660-596af9009e82",
    "photo-1621761191319-c6fb62004040",
    "photo-1634704784915-aacf363b021f",
    "photo-1644088379091-d574269d422f"
  ],
  retail: [
    "photo-1578916171728-46686eac8d58",
    "photo-1534723452862-4c874018d66d",
    "photo-1604719312566-8912e9227c6a",
    "photo-1542838132-92c53300491e",
    "photo-1583258292688-d0213dc5a3a8",
    "photo-1556740738-b6a63e27c4df",
    "photo-1556742044-3c52d6e88c62",
    "photo-1556740758-90de374c12ad",
    "photo-1441986300917-64674bd600d8",
    "photo-1567401893414-76b7b1e5a7a5",
    "photo-1528698827591-e19ccd7bc23d",
    "photo-1579113800032-c38bd7635818",
    "photo-1506617420156-8e4536971650",
    "photo-1580913428706-c311e67898b3",
    "photo-1588964895597-cfccd6e2dbf9",
    "photo-1543168256-418811576931",
    "photo-1601599561213-832382fd07ba",
    "photo-1607082348824-0a96f2a4b9da",
    "photo-1556742111-a301076d9d18",
    "photo-1515168833906-d2a3b82b302a"
  ],
  smartliving: [
    "photo-1498837167922-ddd27525d352",
    "photo-1505705694340-019e1e335916",
    "photo-1490645935967-10de6ba17061",
    "photo-1476480862126-209bfaa8edc8",
    "photo-1596541223130-5d31a73bb6e8",
    "photo-1512621776951-a57141f2eefd",
    "photo-1546069901-ba9599a7e63c",
    "photo-1540420773420-3366772f4999",
    "photo-1506484381205-f7945653044d",
    "photo-1556911220-e15b29be8c8f",
    "photo-1556909114-f6e7ad7d3136",
    "photo-1584622650111-993a426fbf0a",
    "photo-1517836357463-d25dfeac3438",
    "photo-1538805060514-97d9cc17730c",
    "photo-1544367567-0f2fcb009e0b",
    "photo-1505576399279-565b52d4ac71",
    "photo-1466637574441-749b8f19452f",
    "photo-1495521821757-a1efb6729352",
    "photo-1547592180-85f173990554",
    "photo-1511690656952-34342bb7c2f2",
    "photo-1558002038-1055907df827",
    "photo-1513694203232-719a280e022f"
  ],
  sains: [
    "photo-1507668077129-56e32842fceb",
    "photo-1516321318423-f06f85e504b3",
    "photo-1532094349884-543bc11b234d",
    "photo-1523240795612-9a054b0db644",
    "photo-1509062522246-3755977927d7",
    "photo-1434030216411-0b793f4b4173",
    "photo-1513258496099-48168024aec0",
    "photo-1522202176988-66273c2fd55f",
    "photo-1581093458791-9f3c3900df4b",
    "photo-1581093588401-fbb62a02f120",
    "photo-1576086213369-97a306d36557",
    "photo-1532187863486-abf9dbad1b69",
    "photo-1503676260728-1c00da094a0b",
    "photo-1456513080510-7bf3a84b82f8",
    "photo-1488190211105-8b0e65b80b4e",
    "photo-1517245386807-bb43f82c33c4",
    "photo-1524178232363-1fb2b075b655",
    "photo-1501504905252-473c47e087f8"
  ]
};

export function getPostImage(post: PostLike): string {
  if (post?.data?.image && post.data.image.trim().length > 0) {
    return post.data.image;
  }

  const cat = (post?.data?.category || '').toLowerCase();
  const tagStr = (post?.data?.tags || []).join(' ').toLowerCase();

  let chosenBucket = curatedBank.enterprise;

  if (cat.includes('erp') || tagStr.includes('erpnext') || tagStr.includes('manufaktur')) {
    chosenBucket = curatedBank.enterprise;
  } else if (cat.includes('cloud') || tagStr.includes('vps') || tagStr.includes('server') || tagStr.includes('docker')) {
    chosenBucket = curatedBank.cloud;
  } else if (cat.includes('keamanan') || tagStr.includes('security') || tagStr.includes('scam')) {
    chosenBucket = curatedBank.security;
  } else if (cat.includes('blockchain') || tagStr.includes('avalanche') || tagStr.includes('rwa')) {
    chosenBucket = curatedBank.blockchain;
  } else if (cat.includes('local') || tagStr.includes('sembako') || tagStr.includes('warung') || tagStr.includes('umkm')) {
    chosenBucket = curatedBank.retail;
  } else if (cat.includes('smart') || tagStr.includes('diet') || tagStr.includes('nutrisi') || tagStr.includes('sehat')) {
    chosenBucket = curatedBank.smartliving;
  } else if (cat.includes('sains') || tagStr.includes('edukasi') || tagStr.includes('ai')) {
    chosenBucket = curatedBank.sains;
  }

  const hash = Math.abs(hashString(post?.id || 'bijak-article'));
  const photoId = chosenBucket[hash % chosenBucket.length];
  return `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=1200&h=675&q=80`;
}
