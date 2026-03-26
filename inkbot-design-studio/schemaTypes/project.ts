// inkbot-design-studio/schemaTypes/project.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'project',
  title: 'Case Study',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Client / Project Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'services',
      title: 'Services Provided',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Brand Strategy', value: 'Brand Strategy'},
          {title: 'Logo Design', value: 'Logo Design'},
          {title: 'Web Design', value: 'Web Design'},
          {title: 'SEO', value: 'SEO'},
        ]
      }
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'challenge',
      title: 'The Challenge',
      type: 'text',
    }),
    defineField({
      name: 'solution',
      title: 'The Solution',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
})