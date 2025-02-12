const Bilibili = ({
  aid,
  bvid,
  cid,
}: {
  aid: string;
  bvid: string;
  cid: string;
}) => (
  <div className="w-full aspect-video">
    <iframe
      title="Bilibili"
      width="100%"
      height="100%"
      src={`https://player.bilibili.com/player.html?aid=${aid}&bvid=${bvid}&cid=${cid}&p=1&as_wide=1&high_quality=1&danmaku=0&autoplay=0`}
      sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts"
    />
  </div>
);

export default Bilibili;
