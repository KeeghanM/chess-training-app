import Heading from '@components/_elements/heading'

type Span = {
  start: number
  end: number
  type: string
  data?: Record<string, string>
}

export type RichTextContent = {
  spans: Span[]
  text: string
  type: string
  url?: string
  alt?: string
}

export function PrismicRichToHtml(content: RichTextContent) {
  const mergeOverlappingSpans = (spans: Span[]) => {
    const mergedSpans = []

    spans.sort((a, b) => a.start - b.start || a.end - b.end)

    for (const span of spans) {
      const lastSpan = mergedSpans[mergedSpans.length - 1]

      if (lastSpan && span.start <= lastSpan.end) {
        lastSpan.end = Math.max(lastSpan.end, span.end)
        lastSpan.types.push(span.type)
        if (span.type === 'hyperlink') {
          lastSpan.data = span.data
        }
      } else {
        mergedSpans.push({
          ...span,
          types: [span.type],
        })
      }
    }

    return mergedSpans
  }

  const applySpans = (text: string, spans: Span[]) => {
    const mergedSpans = mergeOverlappingSpans(spans)
    let result = ''
    let pointer = 0

    for (const span of mergedSpans) {
      result += text.slice(pointer, span.start)

      let spanContent = text.slice(span.start, span.end)
      for (const type of span.types) {
        switch (type) {
          case 'em':
            spanContent = `<em>${spanContent}</em>`
            break
          case 'strong':
            spanContent = `<strong>${spanContent}</strong>`
            break
          case 'hyperlink':
            spanContent = `<a class="font-bold text-purple-700 underline hover:text-purple-600 hover:no-underline" href="${
              span.data!.url
            }">${spanContent}</a>`
            break
        }
      }

      result += spanContent
      pointer = span.end
    }
    // Append any remaining content after the last span
    result += text.slice(pointer)

    result = decodeUTF8(result)

    return result
  }

  if (content.spans) {
    const sortedSpans = [...content.spans].sort((a, b) => b.start - a.start)
    content.text = applySpans(content.text, sortedSpans)
  }

  const html = { __html: content.text }

  switch (content.type) {
    case 'paragraph':
      return <p className="mb-4 md:mb-6" dangerouslySetInnerHTML={html} />
    case 'heading1':
      return (
        <Heading as="h1">
          <span dangerouslySetInnerHTML={html} />
        </Heading>
      )
    case 'heading2':
      return (
        <Heading as="h2">
          <span dangerouslySetInnerHTML={html} />
        </Heading>
      )
    case 'heading3':
      return (
        <Heading as="h3">
          <span dangerouslySetInnerHTML={html} />
        </Heading>
      )
    case 'heading4':
      return (
        <Heading as="h4">
          <span dangerouslySetInnerHTML={html} />
        </Heading>
      )
    case 'list-item':
      return <li dangerouslySetInnerHTML={html} />
    case 'o-list-item':
      return <li dangerouslySetInnerHTML={html} />
    case 'image':
      return (
        <div className="flex flex-col gap-2">
          <img
            className="max-w-[600px] w-full mx-auto"
            src={content.url}
            alt={content.alt}
          />
          <p>{content.alt}</p>
        </div>
      )
    default:
      return <p className="mb-4 md:mb-6" dangerouslySetInnerHTML={html} />
  }
}

export function decodeUTF8(str: string) {
  return str
    .replace(/’/g, "'")
    .replace(/‘/g, "'")
    .replace(/“/g, '"')
    .replace(/”/g, '"')
    .replace(/–/g, '-')
    .replace(/ - /g, '-')
    .replace(/ /g, ' ')
    .replace(/ /g, ' ')
    .replace(/…/g, '...')
    .replace(/«/g, '<<')
    .replace(/»/g, '>>')
    .replace(/•/g, '*')
    .replace(/©/g, '(c)')
    .replace(/®/g, '(r)')
    .replace(/™/g, '(tm)')
    .replace(/°/g, ' deg ')
}
