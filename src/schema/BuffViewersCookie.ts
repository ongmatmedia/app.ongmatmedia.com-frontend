import { Field, Int, ObjectType, ID } from 'type-graphql';

import { attribute, hashKey, rangeKey, table } from '@aws/dynamodb-data-mapper-annotations';

@table('buff-viewers-cookies')
export class BuffViewersCookie {
  @hashKey()
  uid: string;

  @attribute()
  ip: string;

  @attribute()
  cookie: string;
}
