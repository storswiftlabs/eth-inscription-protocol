import faker from 'faker/locale/en'

export async function GET() {
  const generateData = () => {
    return {
      type: 'im',
      title: 'general',
      text: faker.lorem.paragraph(),
      image: ['https://i.pravatar.cc/150?u=a042581f4e29026704d', 'https://i.pravatar.cc/150?u=a042581f4e29026704d', 'https://i.pravatar.cc/150?u=a042581f4e29026704d', 'https://i.pravatar.cc/150?u=a042581f4e29026704d', 'https://i.pravatar.cc/150?u=a042581f4e29026704d', 'https://i.pravatar.cc/150?u=a042581f4e29026704d', 'https://i.pravatar.cc/150?u=a042581f4e29026704d'],
      receiver: [''],
      c_at: ['', ''],
      c_with: '',
    }
  }
  const arrData = Array.from({ length: 10 }).map(t => t = generateData())

  return new Response(JSON.stringify(arrData), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}
