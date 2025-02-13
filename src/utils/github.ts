// const config = {};

// const fetchGithubIssues = (type: "page" | "post", current: number) =>
//   fetch(
//     `https://api.github.com/search/issues?q=repo:${
//       config.repo
//     }+state:open+author:${config.name}+${encodeURIComponent(
//       `[${type}]`
//     )}+in:title&per_page=10&sort=updated&page=${current}`
//   ).then((res) => res.json());
