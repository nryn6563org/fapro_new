export const sampleCustomers = [
  {
    id: '1',
    name: '김민준',
    investmentType: '공격형',
    totalAssets: '12억',
    holdings: '삼성전자 외 2종목',
    notes: 'AI 반도체 관심 높음',
    phone: '010-1234-5678',
    email: 'minjun.kim@email.com',
    joinDate: '2023-01-15',
    totalInvestment: '10억 4,300만원',
    currentValuation: '12억',
    deposit: '2,150만원',
    totalReturnRate: '+15.02%',
    aiAnalysis: {
      investmentTendency: '공격형 고객으로 현재 포트폴리오는 성장주 중심으로 구성되어 있습니다.',
      returnAnalysis: '전체 포트폴리오가 +15.02%의 양호한 수익률을 보이고 있으며, 모든 보유 종목이 수익 상태입니다.',
      riskDiagnosis: 'AI 반도체 섹터에 집중된 포트폴리오로 변동성이 있을 수 있으나, 현재는 안정적인 수익을 창출 중입니다.',
      recommendedAction: '섹터 다각화를 통한 리스크 분산을 고려해보시고, 2차전지 또는 바이오 섹터 추가 편입을 제안합니다.'
    },
    holdingDetails: [
      {
        name: '삼성전자',
        quantity: '500주',
        value: '3억 2천만원',
        avgPrice: '64,000원',
        currentPrice: '68,500원',
        profit: '+2,250만원',
        profitRate: '+7.03%'
      },
      {
        name: 'SK하이닉스',
        quantity: '200주',
        value: '2억 5천만원',
        avgPrice: '120,000원',
        currentPrice: '125,000원',
        profit: '+1,000만원',
        profitRate: '+4.17%'
      },
      {
        name: 'NAVER',
        quantity: '150주',
        value: '2억 8천만원',
        avgPrice: '180,000원',
        currentPrice: '187,000원',
        profit: '+1,050만원',
        profitRate: '+3.89%'
      }
    ]
  },
  {
    id: '2',
    name: '이서연',
    investmentType: '안정형',
    totalAssets: '8억',
    holdings: '삼성바이오로직스 외 1종목',
    notes: '배당주 선호, 리스크 회피 성향',
    phone: '010-9876-5432',
    email: 'seoyeon.lee@email.com',
    joinDate: '2022-08-20',
    holdingDetails: [
      {
        name: '삼성바이오로직스',
        quantity: '100주',
        value: '5억원',
        avgPrice: '480,000원',
        currentPrice: '500,000원',
        profit: '+2,000만원',
        profitRate: '+4.17%'
      },
      {
        name: '삼성물산',
        quantity: '300주',
        value: '3억원',
        avgPrice: '95,000원',
        currentPrice: '100,000원',
        profit: '+1,500만원',
        profitRate: '+5.26%'
      }
    ]
  },
  {
    id: '3',
    name: '박준호',
    investmentType: '중립형',
    totalAssets: '15억',
    holdings: '현대차 외 3종목',
    notes: '2차전지 및 자동차 섹터 관심',
    phone: '010-5555-7777',
    email: 'junho.park@email.com',
    joinDate: '2023-03-10',
    holdingDetails: [
      {
        name: '현대차',
        quantity: '300주',
        value: '4억 5천만원',
        avgPrice: '145,000원',
        currentPrice: '150,000원',
        profit: '+1,500만원',
        profitRate: '+3.45%'
      },
      {
        name: 'LG에너지솔루션',
        quantity: '150주',
        value: '5억원',
        avgPrice: '320,000원',
        currentPrice: '333,000원',
        profit: '+1,950만원',
        profitRate: '+4.06%'
      },
      {
        name: '포스코퓨처엠',
        quantity: '200주',
        value: '3억원',
        avgPrice: '142,000원',
        currentPrice: '150,000원',
        profit: '+1,600만원',
        profitRate: '+5.63%'
      }
    ]
  },
  {
    id: '4',
    name: '최유진',
    investmentType: '공격형',
    totalAssets: '20억',
    holdings: '카카오 외 4종목',
    notes: '테크주 및 성장주 선호, 단기 매매 활발',
    phone: '010-3333-4444',
    email: 'yujin.choi@email.com',
    joinDate: '2022-11-25',
    holdingDetails: [
      {
        name: '카카오',
        quantity: '400주',
        value: '6억원',
        avgPrice: '145,000원',
        currentPrice: '150,000원',
        profit: '+2,000만원',
        profitRate: '+3.45%'
      },
      {
        name: '네이버',
        quantity: '200주',
        value: '5억 5천만원',
        avgPrice: '265,000원',
        currentPrice: '275,000원',
        profit: '+2,000만원',
        profitRate: '+3.77%'
      },
      {
        name: '엔씨소프트',
        quantity: '150주',
        value: '4억원',
        avgPrice: '255,000원',
        currentPrice: '267,000원',
        profit: '+1,800만원',
        profitRate: '+4.71%'
      },
      {
        name: '크래프톤',
        quantity: '100주',
        value: '3억 5천만원',
        avgPrice: '335,000원',
        currentPrice: '350,000원',
        profit: '+1,500만원',
        profitRate: '+4.48%'
      }
    ]
  },
  {
    id: '5',
    name: '강민서',
    investmentType: '안정형',
    totalAssets: '10억',
    holdings: 'KB금융 외 2종목',
    notes: '금융주 및 배당주 중심 포트폴리오',
    phone: '010-8888-9999',
    email: 'minseo.kang@email.com',
    joinDate: '2023-06-01',
    holdingDetails: [
      {
        name: 'KB금융',
        quantity: '500주',
        value: '4억원',
        avgPrice: '76,000원',
        currentPrice: '80,000원',
        profit: '+2,000만원',
        profitRate: '+5.26%'
      },
      {
        name: '신한지주',
        quantity: '400주',
        value: '3억 5천만원',
        avgPrice: '84,000원',
        currentPrice: '87,500원',
        profit: '+1,400만원',
        profitRate: '+4.17%'
      },
      {
        name: '하나금융지주',
        quantity: '300주',
        value: '2억 5천만원',
        avgPrice: '80,000원',
        currentPrice: '83,300원',
        profit: '+990만원',
        profitRate: '+4.13%'
      }
    ]
  },
  {
    id: '6',
    name: '정우성',
    investmentType: '중립형',
    totalAssets: '18억',
    holdings: '셀트리온 외 3종목',
    notes: '바이오 및 헬스케어 관심, 중장기 투자 선호',
    phone: '010-2222-6666',
    email: 'woosung.jung@email.com',
    joinDate: '2022-09-15',
    holdingDetails: [
      {
        name: '셀트리온',
        quantity: '250주',
        value: '6억원',
        avgPrice: '230,000원',
        currentPrice: '240,000원',
        profit: '+2,500만원',
        profitRate: '+4.35%'
      },
      {
        name: '삼성바이오로직스',
        quantity: '80주',
        value: '4억원',
        avgPrice: '480,000원',
        currentPrice: '500,000원',
        profit: '+1,600만원',
        profitRate: '+4.17%'
      },
      {
        name: '유한양행',
        quantity: '300주',
        value: '3억 5천만원',
        avgPrice: '112,000원',
        currentPrice: '116,700원',
        profit: '+1,410만원',
        profitRate: '+4.20%'
      }
    ]
  }
]

export const recentCustomerSearches = [
  '업종별 고객 중 자산 5억 이상 고수 등급 찾아줘',
  '공격적인 고객 중 2년차만 관심 많은 고객 찾아줘',
  '바이오 섹터 보유 중인 공격적 고객 검색',
  '개인투자자 많은 웬만한 고객'
]

export const customerQuickFilters = ['전체', '공격형', '중립형', '안정형']
