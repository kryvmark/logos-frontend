export const conf = {
  workFrom: '11:00',
  workTo: '22:30',
  maxDeliveryTime: 43,
  workDay: new Date().getDay() !== 0,

  deliveryPoints: [
    {
      address: 'вул. Володимира Великого, 10в',
      marker: {
        lat: 49.809642235317526,
        lng: 24.010223773307352,
      },
    },
    {
      address: 'вул. Чорновола, 95',
      marker: {
        lat: 49.86327887516673,
        lng: 24.016716769696522,
      },
    },
  ],

  mapBounds: {
    north: 49.9302751467373,
    west: 23.832518541242006,
    south: 49.73118511137695,
    east: 24.1991222899474,
  },

  categories: {
    '': 'Всі',
    philadelphia: 'Роли Філадельфія',
    california: 'Роли Каліфорнія',
    baked: 'Запечені роли',
    craft: 'Фірмові суші',
    maki: 'Роли Макі',
    premium: 'Преміум суші',
  },
};
