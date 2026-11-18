# LEP article publishing standard · relationship-first photography

Applies to every new or revised article, in Chinese, English and French.

1. **First viewport when we have proof of a relationship:** place an *existing* authentic photograph of James Liu with the school's principal, owner, admissions officer, teacher or other official school representative immediately after the title/byline. Keep the concise answer immediately after the photograph, early in the HTML for AI quotation and accessibility.
2. **No forced photos:** campus landscapes, James-only portraits, decorative images, timetables, fee graphics and curriculum diagrams should remain where they explain the story. Do not add a generic photo to an article without a school-representative photograph merely to fill the first screen.
3. **Truthful photography:** identify the school and people accurately. Never suggest a relationship, school visit or endorsement that did not occur. Use the article's existing caption and alt text.
4. **Photo markup:** put authentic school-representative photographs in `<figure class="article-photo">` with accurate `alt` and `figcaption`. Curate the verified image path in `_data/article_trust_photos.yml`. The `node` layout automatically lifts the first matching figure near the title and removes its duplicate from the original body location. The image gets high loading priority. The six already-approved Saudi scholarship guides have explicit `lead_visit_photo: true` front matter.
5. **Conversion:** after giving specific, useful and sourced answers, show how LEP can help with school fit, application, visits, paperwork and next steps. Use a contextual, truthful contact invitation; avoid unsupported guarantees. Preserve differences between school-funded application help and paid local services.
6. **Review before release:** check the first viewport on desktop and mobile if an approved relationship photo exists; confirm faces remain visible, no duplicate image, captions and links are correct, body diagrams remain intact, and the contact action works. Do not publish translated articles or new claims without the owner's editorial approval when requested.

This is the persistent implementation rule; the site's layout and curated trust-photo list enforce it for existing and future qualifying articles without changing pages that lack the right imagery.
