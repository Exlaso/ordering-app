import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate as MustDate,
  IsDefined,
  IsNumber as MustNumber,
  IsNumberOptions,
  IsString as MustString,
  Length,
  MaxDate as MustMaxDate,
  MinDate as MustMinDate,
  IsBoolean as MustBoolean,
  ValidateNested,
  ValidationOptions,
} from 'class-validator';

export function IsString({
                           stringOption,
                           ApiPropertyOptions,
                           length,
                         }: {
  stringOption?: ValidationOptions;
  ApiPropertyOptions?: ApiPropertyOptions;
  length?: { min: number; max: number };
}) {
  const OptionalDecorators = [];
  if (length) {
    OptionalDecorators.push(Length(length.min, length.max));
  }
  return applyDecorators(
    IsDefined(),
    MustString(stringOption),
    ...OptionalDecorators,
    ApiProperty(ApiPropertyOptions),
  );
}

export function IsNumber({
                           numberOption,
                           ApiPropertyOptions,
                         }: {
  numberOption?: IsNumberOptions;
  ApiPropertyOptions?: ApiPropertyOptions;
}) {
  return applyDecorators(
    IsDefined(),
    MustNumber(numberOption),
    ApiProperty(ApiPropertyOptions),
  );
}

export function IsDate({
                         dateOption,
                         ApiPropertyOptions,
                         MaxDate,
                         Mindate,
                       }: {
  dateOption?: ValidationOptions;
  ApiPropertyOptions?: ApiPropertyOptions;
  MaxDate?: {
    date: Date;
    message: string;
  };
  Mindate?: {
    date: Date;
    message: string;
  };
}) {
  const OptionalDecorators = [];
  if (Mindate) {
    OptionalDecorators.push(
      MustMinDate(Mindate.date, {
        message: Mindate.message,
      }),
    );
  }
  if (MaxDate) {
    OptionalDecorators.push(
      MustMaxDate(MaxDate.date, {
        message: MaxDate.message,
      }),
    );
  }
  return applyDecorators(
    IsDefined(),
    MustDate(dateOption),
    ApiProperty(ApiPropertyOptions),
    ...OptionalDecorators,
    Type(() => Date),
  );
}

export function IsID({
                       ApiPropertyOptions,
                       idName,
                     }: {
  ApiPropertyOptions?: ApiPropertyOptions;
  idName?: string;
}) {
  return applyDecorators(
    IsDefined(),
    MustString(),
    Length(24, 24, {
      message: `Invalid ${idName} ID`,
    }),
    ApiProperty({
      description: `${idName} ID`,
      example: '60f1b0e1f9f9b3f1b4f9b3f1',
      ...ApiPropertyOptions,
    }),
  );
}

export function IsNestedArray({
                                type,
                                ApiPropertyOptions,
                              }: {
  type: any;
  ApiPropertyOptions?: ApiPropertyOptions;
}) {
  return applyDecorators(
    IsArray(),
    ValidateNested({ each: true }),
    Type(() => type),
    ApiProperty(
      ApiPropertyOptions ?? {
        description: 'Nested Array',
        type: [type],
      },
    ),
  );
}

export function IsUpperCase() {
  return applyDecorators(
    Type(() => String().toUpperCase)
  );
}


export function IsBoolean({
                            ApiPropertyOptions,
                          }: {
  ApiPropertyOptions?: ApiPropertyOptions;
}) {
  return applyDecorators(
    IsDefined(),
    MustBoolean(),
    ApiProperty(ApiPropertyOptions ?? { type: Boolean } ),
  );
}