import Parser from 'rss-parser';

export default async function handler(req, res) {
    try {
        const parser = new Parser({
            customFields: {
                item: ['content:encoded', 'categories'],
            }
        });

        const feed = await parser.parseURL('https://medium.com/feed/@ananidzezitze');

        const posts = feed.items.map(item => {
            // Medium puts the first image inside the content:encoded field
            const content = item['content:encoded'] || item.content || '';
            const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
            const thumbnail = imgMatch ? imgMatch[1] : null;

            // Extract a brief text snippet
            // First remove HTML tags
            const textContent = content.replace(/<\/?[^>]+(>|$)/g, " ");
            // Then truncate
            const snippet = textContent.substring(0, 150).trim() + '...';

            return {
                title: item.title,
                link: item.link,
                pubDate: item.pubDate,
                thumbnail,
                snippet,
                categories: item.categories || [],
            };
        });

        res.status(200).json({ posts });
    } catch (error) {
        console.error('Error fetching Medium RSS:', error);
        res.status(500).json({ error: 'Failed to fetch blog posts', details: error.message });
    }
}
