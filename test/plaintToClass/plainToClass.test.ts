import { Post, PostType } from './dto'
import { plainToClass } from 'class-transformer'

import { expect } from 'chai'
import { validate } from 'class-validator'

describe('plainToClass', () => {

  const validPostJson = {
    title: 'post malon Circles',
    text: 'hello post malon  how are you?',
    rating: 123123,
    email: 'a@a.com',
    createDate: new Date('2020-05-05'),
    site: 'fin2b.com',
    tags: ['sesd', 'type', 'vue'],
    type: PostType.Public,
  }
  const postJson = {
    title: 'post',
    text: 'post malon how are you?',
    rating: 123.23,
    email: 'a@a',
    createDate: '2020-05-05',
    site: 'fin2bcom',
    tags: [],
    type: 2,
  }

  it('Given 8 invalid object property, then make 8 errors', async () => {

    const post = plainToClass(Post, postJson)

    const errors = await validate(post)
    console.log(errors.map(e => `${e.property}: ${JSON.stringify(e.constraints)}`))
    expect(errors).to.be.lengthOf(8)
  })

  // can validate array, should loop
  it('Given invalid plain object array, then make error', async() => {

    const postArrayJson = [postJson, postJson]
    const posts = plainToClass(Post, postArrayJson)
    
    const errors = await validate(posts)

    console.log('errors', errors)

    expect(errors.length).to.be.gte(1)
  })

  it('Given null or undefined, then IsOptional validate to success', async() => {

    const optionalPostJson = {
      title: null,
      text: undefined,
      rating: 12323,
      email: 'a@a.com',
      createDate: new Date('2020-05-05'),
      site: 'fin2b.com',
      tags: ['ts44', 'vue', 'react'],
      type: 1,
    }
    const posts = plainToClass(Post, optionalPostJson)
    const errors = await validate(posts)

    console.log(errors.map(e => `${e.property}: ${JSON.stringify(e.constraints)}`))

    expect(errors).to.be.lengthOf(3)
  })
})
