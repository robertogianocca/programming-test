import CustomReactPlayer from '@/components/CustomReactPlayer/CustomReactPlayer';

export default function Players() {
  // Replace with your Vimeo video URL
  const vimeoUrl = 'https://www.youtube.com/watch?v=LXb3EKWsInQ'
  return (
    <div className="min-h-screen bg-gray-900 p-0">
      <h1 className="text-white text-2xl mb-8 text-center">Custom Video Player</h1>
      <CustomReactPlayer url={vimeoUrl} />
    </div>
  );
}
