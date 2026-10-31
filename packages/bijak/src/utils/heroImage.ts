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
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&h=675&q=80",
    "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&h=675&q=80",
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&h=675&q=80",
    "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1200&h=675&q=80",
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&h=675&q=80"
  ],
  cloud: [
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&h=675&q=80",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&h=675&q=80",
    "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&h=675&q=80",
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&h=675&q=80"
  ],
  security: [
    "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&h=675&q=80",
    "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=1200&h=675&q=80",
    "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=1200&h=675&q=80"
  ],
  blockchain: [
    "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1200&h=675&q=80",
    "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=1200&h=675&q=80",
    "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?auto=format&fit=crop&w=1200&h=675&q=80"
  ],
  retail: [
    "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=1200&h=675&q=80",
    "https://images.unsplash.com/photo-1534723452862-4c874018d66d?auto=format&fit=crop&w=1200&h=675&q=80",
    "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=1200&h=675&q=80",
    "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&h=675&q=80"
  ],
  smartliving: [
    "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1200&h=675&q=80",
    "https://images.unsplash.com/photo-1505705694340-019e1e335916?auto=format&fit=crop&w=1200&h=675&q=80",
    "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&h=675&q=80",
    "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=1200&h=675&q=80"
  ],
  sains: [
    "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=1200&h=675&q=80",
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&h=675&q=80",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&h=675&q=80"
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
  return chosenBucket[hash % chosenBucket.length];
}
