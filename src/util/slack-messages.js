// Initialize the cache as an empty object
const cache = {};

/**
 * Update cache manually
 */
function setAttachmentToCache(attachments) {
  if (!attachments) return;
  cache.attachments = attachments;
}
/**
 * Cache based template info block.
 * Initiates in the first call and returns updated value from second call onwards.
 * */
function getTemplateInfo({
  color = null,
  header = null,
  context1 = null,
  context2 = null,
}) {
  if (!cache.hasOwnProperty('attachments')) {
    cache.attachments = [
      {
        color: color || '#fbf7f5',
        blocks: [
          {
            type: 'header',
            text: {
              type: 'plain_text',
              text: header || ' ',
              emoji: true,
            },
          },
          {
            type: 'divider',
          },
          {
            type: 'context',
            elements: [
              {
                type: 'plain_text',
                text: context1 || ' ',
                emoji: true,
              },
            ],
          },
          {
            type: 'context',
            elements: [
              {
                type: 'plain_text',
                text: context2 || ' ',
                emoji: true,
              },
            ],
          },
        ],
      },
    ];
    return cache.attachments;
  }

  if (color != null) {
    cache.attachments[0].color = color;
  }

  if (header != null) {
    cache.attachments[0].blocks[0].text.text = header;
  }

  if (context1 != null) {
    cache.attachments[0].blocks[2].elements[0].text = context1;
  }

  if (context2 != null) {
    cache.attachments[0].blocks[3].elements[0].text = context2;
  }

  return cache.attachments;
}

module.exports = { getTemplateInfo, setAttachmentToCache };
