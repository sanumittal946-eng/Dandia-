<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep all public festival facts, prices, media references, and booking destinations in `src/lib/festival-data.ts` so unconfirmed commercial details cannot drift across sections.
- Keep the site as one scrolling campaign page at `/` because its navigation is a sequence of sections in a single festival experience.
- Demo music loops are local files in `public/audio`; replace their paths in festival data when licensed tracks are supplied.
