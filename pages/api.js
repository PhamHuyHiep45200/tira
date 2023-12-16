export default async function handler(req, res) {
  const url = process.env.NEXT_PUBLIC_URL_SERVER; // URL của API trên EC2
  console.log('sos',url)
  const response = await fetch(url);
  const data = await response.json();

  res.status(200).json(data);
}
