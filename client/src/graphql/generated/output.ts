import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type GeneralStatisticModel = {
  __typename?: 'GeneralStatisticModel';
  percent: Scalars['String']['output'];
  totalTimeInSeconds: Scalars['Int']['output'];
};

export type HistoryItemModel = {
  __typename?: 'HistoryItemModel';
  day: Scalars['String']['output'];
  entries: Array<TimerHistoryModel>;
  general: GeneralStatisticModel;
};

export type LoginDto = {
  login: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: Scalars['String']['output'];
  createUserTimer: UserTimerModel;
  loginUser: UserModel;
  logoutUser: Scalars['Boolean']['output'];
  pauseTimer: UserTimerModel;
  registrationUser: UserModel;
  resetPassword: Scalars['Boolean']['output'];
  startTimer: UserTimerModel;
  stopTimer: UserTimerModel;
  validateResetCode: Scalars['String']['output'];
};


export type MutationChangePasswordArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationLoginUserArgs = {
  loginDto: LoginDto;
};


export type MutationPauseTimerArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
};


export type MutationRegistrationUserArgs = {
  registrationDto: RegistrationDto;
};


export type MutationResetPasswordArgs = {
  email: Scalars['String']['input'];
};


export type MutationStartTimerArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
};


export type MutationStopTimerArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
};


export type MutationValidateResetCodeArgs = {
  code: Scalars['Int']['input'];
  email: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  getByPeriod: Array<TimerHistoryModel>;
  getByTimerId: Array<TimerHistoryModel>;
  getTimer: UserTimerModel;
  getTimerHistoryGroupByDate: Array<TimerHistoryGroupModel>;
  getTimerHistoryGroupByTimerId: Array<TimerHistoryGroupModel>;
  getUsers: Array<UserModel>;
  getWeekStatistic: TimerStatisticModel;
  profileData: UserModel;
};


export type QueryGetByPeriodArgs = {
  endPeriod: Scalars['DateTime']['input'];
  startPeriod: Scalars['DateTime']['input'];
};


export type QueryGetByTimerIdArgs = {
  timerId: Scalars['String']['input'];
};


export type QueryGetTimerHistoryGroupByDateArgs = {
  endPeriod: Scalars['DateTime']['input'];
  startPeriod: Scalars['DateTime']['input'];
};


export type QueryGetTimerHistoryGroupByTimerIdArgs = {
  endPeriod: Scalars['DateTime']['input'];
  startPeriod: Scalars['DateTime']['input'];
};


export type QueryGetWeekStatisticArgs = {
  weekOffset?: InputMaybe<Scalars['Int']['input']>;
};

export type RegistrationDto = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  login: Scalars['String']['input'];
  middleName?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
};

export type TimerHistoryGroupModel = {
  __typename?: 'TimerHistoryGroupModel';
  groupField: Scalars['String']['output'];
  records: Array<TimerHistoryModel>;
};

export type TimerHistoryModel = {
  __typename?: 'TimerHistoryModel';
  description?: Maybe<Scalars['String']['output']>;
  endTimer: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  startTimer: Scalars['DateTime']['output'];
  timerId: Scalars['String']['output'];
  totalTimeInSeconds: Scalars['Float']['output'];
  user: UserModel;
  userId: Scalars['Int']['output'];
};

export type TimerStatisticModel = {
  __typename?: 'TimerStatisticModel';
  endPeriod: Scalars['DateTime']['output'];
  history: Array<HistoryItemModel>;
  length: Scalars['Int']['output'];
  startPeriod: Scalars['DateTime']['output'];
};

export type UserModel = {
  __typename?: 'UserModel';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  login: Scalars['String']['output'];
  middleName?: Maybe<Scalars['String']['output']>;
  password: Scalars['String']['output'];
};

export type UserTimerModel = {
  __typename?: 'UserTimerModel';
  description?: Maybe<Scalars['String']['output']>;
  endTimer?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  startTimer?: Maybe<Scalars['DateTime']['output']>;
  status: Scalars['String']['output'];
  timerId: Scalars['String']['output'];
  totalTimeInSeconds: Scalars['Float']['output'];
  user: UserModel;
  userId: Scalars['Int']['output'];
};

export type ChangePasswordMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  token: Scalars['String']['input'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: string };

export type LoginUserMutationVariables = Exact<{
  loginDto: LoginDto;
}>;


export type LoginUserMutation = { __typename?: 'Mutation', loginUser: { __typename?: 'UserModel', id: string, firstName: string, lastName: string, middleName?: string | null, login: string, email: string } };

export type LogoutUserMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutUserMutation = { __typename?: 'Mutation', logoutUser: boolean };

export type PauseTimerMutationVariables = Exact<{
  description?: InputMaybe<Scalars['String']['input']>;
}>;


export type PauseTimerMutation = { __typename?: 'Mutation', pauseTimer: { __typename?: 'UserTimerModel', id: string, startTimer?: any | null, endTimer?: any | null, totalTimeInSeconds: number, status: string, description?: string | null, timerId: string } };

export type RegistrationUserMutationVariables = Exact<{
  registrationDto: RegistrationDto;
}>;


export type RegistrationUserMutation = { __typename?: 'Mutation', registrationUser: { __typename?: 'UserModel', id: string, firstName: string, lastName: string, middleName?: string | null, login: string, email: string } };

export type ResetPasswordMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: boolean };

export type StartTimerMutationVariables = Exact<{
  description?: InputMaybe<Scalars['String']['input']>;
}>;


export type StartTimerMutation = { __typename?: 'Mutation', startTimer: { __typename?: 'UserTimerModel', id: string, startTimer?: any | null, endTimer?: any | null, totalTimeInSeconds: number, status: string, description?: string | null, timerId: string } };

export type StopTimerMutationVariables = Exact<{
  description?: InputMaybe<Scalars['String']['input']>;
}>;


export type StopTimerMutation = { __typename?: 'Mutation', stopTimer: { __typename?: 'UserTimerModel', id: string, startTimer?: any | null, endTimer?: any | null, totalTimeInSeconds: number, status: string, description?: string | null, timerId: string } };

export type ValidateResetCodeMutationVariables = Exact<{
  code: Scalars['Int']['input'];
  email: Scalars['String']['input'];
}>;


export type ValidateResetCodeMutation = { __typename?: 'Mutation', validateResetCode: string };

export type GetPeriodStatisticQueryVariables = Exact<{
  startPeriod: Scalars['DateTime']['input'];
  endPeriod: Scalars['DateTime']['input'];
}>;


export type GetPeriodStatisticQuery = { __typename?: 'Query', getByPeriod: Array<{ __typename?: 'TimerHistoryModel', id: string, startTimer: any, endTimer: any, totalTimeInSeconds: number, userId: number, description?: string | null, timerId: string, user: { __typename?: 'UserModel', id: string, firstName: string, lastName: string, middleName?: string | null } }> };

export type GetTimerQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTimerQuery = { __typename?: 'Query', getTimer: { __typename?: 'UserTimerModel', id: string, startTimer?: any | null, endTimer?: any | null, totalTimeInSeconds: number, status: string, description?: string | null, timerId: string } };

export type GetTimerHistoryGroupByDateQueryVariables = Exact<{
  startPeriod: Scalars['DateTime']['input'];
  endPeriod: Scalars['DateTime']['input'];
}>;


export type GetTimerHistoryGroupByDateQuery = { __typename?: 'Query', getTimerHistoryGroupByDate: Array<{ __typename?: 'TimerHistoryGroupModel', groupField: string, records: Array<{ __typename?: 'TimerHistoryModel', id: string, startTimer: any, endTimer: any, totalTimeInSeconds: number, userId: number, description?: string | null, timerId: string, user: { __typename?: 'UserModel', id: string, firstName: string, lastName: string, middleName?: string | null } }> }> };

export type GetTimerHistoryGroupByTimerIdQueryVariables = Exact<{
  startPeriod: Scalars['DateTime']['input'];
  endPeriod: Scalars['DateTime']['input'];
}>;


export type GetTimerHistoryGroupByTimerIdQuery = { __typename?: 'Query', getTimerHistoryGroupByTimerId: Array<{ __typename?: 'TimerHistoryGroupModel', groupField: string, records: Array<{ __typename?: 'TimerHistoryModel', id: string, startTimer: any, endTimer: any, totalTimeInSeconds: number, userId: number, description?: string | null, timerId: string, user: { __typename?: 'UserModel', id: string, firstName: string, lastName: string, middleName?: string | null } }> }> };

export type GetWeekStatisticQueryVariables = Exact<{
  weekOffset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetWeekStatisticQuery = { __typename?: 'Query', getWeekStatistic: { __typename?: 'TimerStatisticModel', startPeriod: any, endPeriod: any, length: number, history: Array<{ __typename?: 'HistoryItemModel', day: string, general: { __typename?: 'GeneralStatisticModel', totalTimeInSeconds: number, percent: string }, entries: Array<{ __typename?: 'TimerHistoryModel', id: string, startTimer: any, endTimer: any, totalTimeInSeconds: number, userId: number, description?: string | null, timerId: string, user: { __typename?: 'UserModel', id: string, firstName: string, lastName: string, middleName?: string | null } }> }> } };

export type ProfileDataQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfileDataQuery = { __typename?: 'Query', profileData: { __typename?: 'UserModel', id: string, firstName: string, lastName: string, middleName?: string | null, login: string, email: string } };


export const ChangePasswordDocument = gql`
    mutation ChangePassword($email: String!, $password: String!, $token: String!) {
  changePassword(password: $password, email: $email, token: $token)
}
    `;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      token: // value for 'token'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const LoginUserDocument = gql`
    mutation LoginUser($loginDto: LoginDto!) {
  loginUser(loginDto: $loginDto) {
    id
    firstName
    lastName
    middleName
    login
    email
  }
}
    `;
export type LoginUserMutationFn = Apollo.MutationFunction<LoginUserMutation, LoginUserMutationVariables>;

/**
 * __useLoginUserMutation__
 *
 * To run a mutation, you first call `useLoginUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginUserMutation, { data, loading, error }] = useLoginUserMutation({
 *   variables: {
 *      loginDto: // value for 'loginDto'
 *   },
 * });
 */
export function useLoginUserMutation(baseOptions?: Apollo.MutationHookOptions<LoginUserMutation, LoginUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginUserMutation, LoginUserMutationVariables>(LoginUserDocument, options);
      }
export type LoginUserMutationHookResult = ReturnType<typeof useLoginUserMutation>;
export type LoginUserMutationResult = Apollo.MutationResult<LoginUserMutation>;
export type LoginUserMutationOptions = Apollo.BaseMutationOptions<LoginUserMutation, LoginUserMutationVariables>;
export const LogoutUserDocument = gql`
    mutation LogoutUser {
  logoutUser
}
    `;
export type LogoutUserMutationFn = Apollo.MutationFunction<LogoutUserMutation, LogoutUserMutationVariables>;

/**
 * __useLogoutUserMutation__
 *
 * To run a mutation, you first call `useLogoutUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutUserMutation, { data, loading, error }] = useLogoutUserMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutUserMutation(baseOptions?: Apollo.MutationHookOptions<LogoutUserMutation, LogoutUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutUserMutation, LogoutUserMutationVariables>(LogoutUserDocument, options);
      }
export type LogoutUserMutationHookResult = ReturnType<typeof useLogoutUserMutation>;
export type LogoutUserMutationResult = Apollo.MutationResult<LogoutUserMutation>;
export type LogoutUserMutationOptions = Apollo.BaseMutationOptions<LogoutUserMutation, LogoutUserMutationVariables>;
export const PauseTimerDocument = gql`
    mutation PauseTimer($description: String) {
  pauseTimer(description: $description) {
    id
    startTimer
    endTimer
    totalTimeInSeconds
    status
    description
    timerId
  }
}
    `;
export type PauseTimerMutationFn = Apollo.MutationFunction<PauseTimerMutation, PauseTimerMutationVariables>;

/**
 * __usePauseTimerMutation__
 *
 * To run a mutation, you first call `usePauseTimerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePauseTimerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pauseTimerMutation, { data, loading, error }] = usePauseTimerMutation({
 *   variables: {
 *      description: // value for 'description'
 *   },
 * });
 */
export function usePauseTimerMutation(baseOptions?: Apollo.MutationHookOptions<PauseTimerMutation, PauseTimerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PauseTimerMutation, PauseTimerMutationVariables>(PauseTimerDocument, options);
      }
export type PauseTimerMutationHookResult = ReturnType<typeof usePauseTimerMutation>;
export type PauseTimerMutationResult = Apollo.MutationResult<PauseTimerMutation>;
export type PauseTimerMutationOptions = Apollo.BaseMutationOptions<PauseTimerMutation, PauseTimerMutationVariables>;
export const RegistrationUserDocument = gql`
    mutation RegistrationUser($registrationDto: RegistrationDto!) {
  registrationUser(registrationDto: $registrationDto) {
    id
    firstName
    lastName
    middleName
    login
    email
  }
}
    `;
export type RegistrationUserMutationFn = Apollo.MutationFunction<RegistrationUserMutation, RegistrationUserMutationVariables>;

/**
 * __useRegistrationUserMutation__
 *
 * To run a mutation, you first call `useRegistrationUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegistrationUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registrationUserMutation, { data, loading, error }] = useRegistrationUserMutation({
 *   variables: {
 *      registrationDto: // value for 'registrationDto'
 *   },
 * });
 */
export function useRegistrationUserMutation(baseOptions?: Apollo.MutationHookOptions<RegistrationUserMutation, RegistrationUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegistrationUserMutation, RegistrationUserMutationVariables>(RegistrationUserDocument, options);
      }
export type RegistrationUserMutationHookResult = ReturnType<typeof useRegistrationUserMutation>;
export type RegistrationUserMutationResult = Apollo.MutationResult<RegistrationUserMutation>;
export type RegistrationUserMutationOptions = Apollo.BaseMutationOptions<RegistrationUserMutation, RegistrationUserMutationVariables>;
export const ResetPasswordDocument = gql`
    mutation ResetPassword($email: String!) {
  resetPassword(email: $email)
}
    `;
export type ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, options);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const StartTimerDocument = gql`
    mutation StartTimer($description: String) {
  startTimer(description: $description) {
    id
    startTimer
    endTimer
    totalTimeInSeconds
    status
    description
    timerId
  }
}
    `;
export type StartTimerMutationFn = Apollo.MutationFunction<StartTimerMutation, StartTimerMutationVariables>;

/**
 * __useStartTimerMutation__
 *
 * To run a mutation, you first call `useStartTimerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStartTimerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [startTimerMutation, { data, loading, error }] = useStartTimerMutation({
 *   variables: {
 *      description: // value for 'description'
 *   },
 * });
 */
export function useStartTimerMutation(baseOptions?: Apollo.MutationHookOptions<StartTimerMutation, StartTimerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<StartTimerMutation, StartTimerMutationVariables>(StartTimerDocument, options);
      }
export type StartTimerMutationHookResult = ReturnType<typeof useStartTimerMutation>;
export type StartTimerMutationResult = Apollo.MutationResult<StartTimerMutation>;
export type StartTimerMutationOptions = Apollo.BaseMutationOptions<StartTimerMutation, StartTimerMutationVariables>;
export const StopTimerDocument = gql`
    mutation StopTimer($description: String) {
  stopTimer(description: $description) {
    id
    startTimer
    endTimer
    totalTimeInSeconds
    status
    description
    timerId
  }
}
    `;
export type StopTimerMutationFn = Apollo.MutationFunction<StopTimerMutation, StopTimerMutationVariables>;

/**
 * __useStopTimerMutation__
 *
 * To run a mutation, you first call `useStopTimerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStopTimerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [stopTimerMutation, { data, loading, error }] = useStopTimerMutation({
 *   variables: {
 *      description: // value for 'description'
 *   },
 * });
 */
export function useStopTimerMutation(baseOptions?: Apollo.MutationHookOptions<StopTimerMutation, StopTimerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<StopTimerMutation, StopTimerMutationVariables>(StopTimerDocument, options);
      }
export type StopTimerMutationHookResult = ReturnType<typeof useStopTimerMutation>;
export type StopTimerMutationResult = Apollo.MutationResult<StopTimerMutation>;
export type StopTimerMutationOptions = Apollo.BaseMutationOptions<StopTimerMutation, StopTimerMutationVariables>;
export const ValidateResetCodeDocument = gql`
    mutation ValidateResetCode($code: Int!, $email: String!) {
  validateResetCode(code: $code, email: $email)
}
    `;
export type ValidateResetCodeMutationFn = Apollo.MutationFunction<ValidateResetCodeMutation, ValidateResetCodeMutationVariables>;

/**
 * __useValidateResetCodeMutation__
 *
 * To run a mutation, you first call `useValidateResetCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useValidateResetCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [validateResetCodeMutation, { data, loading, error }] = useValidateResetCodeMutation({
 *   variables: {
 *      code: // value for 'code'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useValidateResetCodeMutation(baseOptions?: Apollo.MutationHookOptions<ValidateResetCodeMutation, ValidateResetCodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ValidateResetCodeMutation, ValidateResetCodeMutationVariables>(ValidateResetCodeDocument, options);
      }
export type ValidateResetCodeMutationHookResult = ReturnType<typeof useValidateResetCodeMutation>;
export type ValidateResetCodeMutationResult = Apollo.MutationResult<ValidateResetCodeMutation>;
export type ValidateResetCodeMutationOptions = Apollo.BaseMutationOptions<ValidateResetCodeMutation, ValidateResetCodeMutationVariables>;
export const GetPeriodStatisticDocument = gql`
    query GetPeriodStatistic($startPeriod: DateTime!, $endPeriod: DateTime!) {
  getByPeriod(startPeriod: $startPeriod, endPeriod: $endPeriod) {
    id
    startTimer
    endTimer
    totalTimeInSeconds
    userId
    description
    timerId
    user {
      id
      firstName
      lastName
      middleName
    }
  }
}
    `;

/**
 * __useGetPeriodStatisticQuery__
 *
 * To run a query within a React component, call `useGetPeriodStatisticQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPeriodStatisticQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPeriodStatisticQuery({
 *   variables: {
 *      startPeriod: // value for 'startPeriod'
 *      endPeriod: // value for 'endPeriod'
 *   },
 * });
 */
export function useGetPeriodStatisticQuery(baseOptions: Apollo.QueryHookOptions<GetPeriodStatisticQuery, GetPeriodStatisticQueryVariables> & ({ variables: GetPeriodStatisticQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPeriodStatisticQuery, GetPeriodStatisticQueryVariables>(GetPeriodStatisticDocument, options);
      }
export function useGetPeriodStatisticLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPeriodStatisticQuery, GetPeriodStatisticQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPeriodStatisticQuery, GetPeriodStatisticQueryVariables>(GetPeriodStatisticDocument, options);
        }
export function useGetPeriodStatisticSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPeriodStatisticQuery, GetPeriodStatisticQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPeriodStatisticQuery, GetPeriodStatisticQueryVariables>(GetPeriodStatisticDocument, options);
        }
export type GetPeriodStatisticQueryHookResult = ReturnType<typeof useGetPeriodStatisticQuery>;
export type GetPeriodStatisticLazyQueryHookResult = ReturnType<typeof useGetPeriodStatisticLazyQuery>;
export type GetPeriodStatisticSuspenseQueryHookResult = ReturnType<typeof useGetPeriodStatisticSuspenseQuery>;
export type GetPeriodStatisticQueryResult = Apollo.QueryResult<GetPeriodStatisticQuery, GetPeriodStatisticQueryVariables>;
export const GetTimerDocument = gql`
    query GetTimer {
  getTimer {
    id
    startTimer
    endTimer
    totalTimeInSeconds
    status
    description
    timerId
  }
}
    `;

/**
 * __useGetTimerQuery__
 *
 * To run a query within a React component, call `useGetTimerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTimerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTimerQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTimerQuery(baseOptions?: Apollo.QueryHookOptions<GetTimerQuery, GetTimerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTimerQuery, GetTimerQueryVariables>(GetTimerDocument, options);
      }
export function useGetTimerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTimerQuery, GetTimerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTimerQuery, GetTimerQueryVariables>(GetTimerDocument, options);
        }
export function useGetTimerSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTimerQuery, GetTimerQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTimerQuery, GetTimerQueryVariables>(GetTimerDocument, options);
        }
export type GetTimerQueryHookResult = ReturnType<typeof useGetTimerQuery>;
export type GetTimerLazyQueryHookResult = ReturnType<typeof useGetTimerLazyQuery>;
export type GetTimerSuspenseQueryHookResult = ReturnType<typeof useGetTimerSuspenseQuery>;
export type GetTimerQueryResult = Apollo.QueryResult<GetTimerQuery, GetTimerQueryVariables>;
export const GetTimerHistoryGroupByDateDocument = gql`
    query GetTimerHistoryGroupByDate($startPeriod: DateTime!, $endPeriod: DateTime!) {
  getTimerHistoryGroupByDate(startPeriod: $startPeriod, endPeriod: $endPeriod) {
    groupField
    records {
      id
      startTimer
      endTimer
      totalTimeInSeconds
      userId
      description
      timerId
      user {
        id
        firstName
        lastName
        middleName
      }
    }
  }
}
    `;

/**
 * __useGetTimerHistoryGroupByDateQuery__
 *
 * To run a query within a React component, call `useGetTimerHistoryGroupByDateQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTimerHistoryGroupByDateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTimerHistoryGroupByDateQuery({
 *   variables: {
 *      startPeriod: // value for 'startPeriod'
 *      endPeriod: // value for 'endPeriod'
 *   },
 * });
 */
export function useGetTimerHistoryGroupByDateQuery(baseOptions: Apollo.QueryHookOptions<GetTimerHistoryGroupByDateQuery, GetTimerHistoryGroupByDateQueryVariables> & ({ variables: GetTimerHistoryGroupByDateQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTimerHistoryGroupByDateQuery, GetTimerHistoryGroupByDateQueryVariables>(GetTimerHistoryGroupByDateDocument, options);
      }
export function useGetTimerHistoryGroupByDateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTimerHistoryGroupByDateQuery, GetTimerHistoryGroupByDateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTimerHistoryGroupByDateQuery, GetTimerHistoryGroupByDateQueryVariables>(GetTimerHistoryGroupByDateDocument, options);
        }
export function useGetTimerHistoryGroupByDateSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTimerHistoryGroupByDateQuery, GetTimerHistoryGroupByDateQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTimerHistoryGroupByDateQuery, GetTimerHistoryGroupByDateQueryVariables>(GetTimerHistoryGroupByDateDocument, options);
        }
export type GetTimerHistoryGroupByDateQueryHookResult = ReturnType<typeof useGetTimerHistoryGroupByDateQuery>;
export type GetTimerHistoryGroupByDateLazyQueryHookResult = ReturnType<typeof useGetTimerHistoryGroupByDateLazyQuery>;
export type GetTimerHistoryGroupByDateSuspenseQueryHookResult = ReturnType<typeof useGetTimerHistoryGroupByDateSuspenseQuery>;
export type GetTimerHistoryGroupByDateQueryResult = Apollo.QueryResult<GetTimerHistoryGroupByDateQuery, GetTimerHistoryGroupByDateQueryVariables>;
export const GetTimerHistoryGroupByTimerIdDocument = gql`
    query GetTimerHistoryGroupByTimerId($startPeriod: DateTime!, $endPeriod: DateTime!) {
  getTimerHistoryGroupByTimerId(startPeriod: $startPeriod, endPeriod: $endPeriod) {
    groupField
    records {
      id
      startTimer
      endTimer
      totalTimeInSeconds
      userId
      description
      timerId
      user {
        id
        firstName
        lastName
        middleName
      }
    }
  }
}
    `;

/**
 * __useGetTimerHistoryGroupByTimerIdQuery__
 *
 * To run a query within a React component, call `useGetTimerHistoryGroupByTimerIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTimerHistoryGroupByTimerIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTimerHistoryGroupByTimerIdQuery({
 *   variables: {
 *      startPeriod: // value for 'startPeriod'
 *      endPeriod: // value for 'endPeriod'
 *   },
 * });
 */
export function useGetTimerHistoryGroupByTimerIdQuery(baseOptions: Apollo.QueryHookOptions<GetTimerHistoryGroupByTimerIdQuery, GetTimerHistoryGroupByTimerIdQueryVariables> & ({ variables: GetTimerHistoryGroupByTimerIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTimerHistoryGroupByTimerIdQuery, GetTimerHistoryGroupByTimerIdQueryVariables>(GetTimerHistoryGroupByTimerIdDocument, options);
      }
export function useGetTimerHistoryGroupByTimerIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTimerHistoryGroupByTimerIdQuery, GetTimerHistoryGroupByTimerIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTimerHistoryGroupByTimerIdQuery, GetTimerHistoryGroupByTimerIdQueryVariables>(GetTimerHistoryGroupByTimerIdDocument, options);
        }
export function useGetTimerHistoryGroupByTimerIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTimerHistoryGroupByTimerIdQuery, GetTimerHistoryGroupByTimerIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTimerHistoryGroupByTimerIdQuery, GetTimerHistoryGroupByTimerIdQueryVariables>(GetTimerHistoryGroupByTimerIdDocument, options);
        }
export type GetTimerHistoryGroupByTimerIdQueryHookResult = ReturnType<typeof useGetTimerHistoryGroupByTimerIdQuery>;
export type GetTimerHistoryGroupByTimerIdLazyQueryHookResult = ReturnType<typeof useGetTimerHistoryGroupByTimerIdLazyQuery>;
export type GetTimerHistoryGroupByTimerIdSuspenseQueryHookResult = ReturnType<typeof useGetTimerHistoryGroupByTimerIdSuspenseQuery>;
export type GetTimerHistoryGroupByTimerIdQueryResult = Apollo.QueryResult<GetTimerHistoryGroupByTimerIdQuery, GetTimerHistoryGroupByTimerIdQueryVariables>;
export const GetWeekStatisticDocument = gql`
    query GetWeekStatistic($weekOffset: Int) {
  getWeekStatistic(weekOffset: $weekOffset) {
    startPeriod
    endPeriod
    length
    history {
      day
      general {
        totalTimeInSeconds
        percent
      }
      entries {
        id
        startTimer
        endTimer
        totalTimeInSeconds
        userId
        description
        timerId
        user {
          id
          firstName
          lastName
          middleName
        }
      }
    }
  }
}
    `;

/**
 * __useGetWeekStatisticQuery__
 *
 * To run a query within a React component, call `useGetWeekStatisticQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWeekStatisticQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWeekStatisticQuery({
 *   variables: {
 *      weekOffset: // value for 'weekOffset'
 *   },
 * });
 */
export function useGetWeekStatisticQuery(baseOptions?: Apollo.QueryHookOptions<GetWeekStatisticQuery, GetWeekStatisticQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWeekStatisticQuery, GetWeekStatisticQueryVariables>(GetWeekStatisticDocument, options);
      }
export function useGetWeekStatisticLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWeekStatisticQuery, GetWeekStatisticQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWeekStatisticQuery, GetWeekStatisticQueryVariables>(GetWeekStatisticDocument, options);
        }
export function useGetWeekStatisticSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetWeekStatisticQuery, GetWeekStatisticQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetWeekStatisticQuery, GetWeekStatisticQueryVariables>(GetWeekStatisticDocument, options);
        }
export type GetWeekStatisticQueryHookResult = ReturnType<typeof useGetWeekStatisticQuery>;
export type GetWeekStatisticLazyQueryHookResult = ReturnType<typeof useGetWeekStatisticLazyQuery>;
export type GetWeekStatisticSuspenseQueryHookResult = ReturnType<typeof useGetWeekStatisticSuspenseQuery>;
export type GetWeekStatisticQueryResult = Apollo.QueryResult<GetWeekStatisticQuery, GetWeekStatisticQueryVariables>;
export const ProfileDataDocument = gql`
    query profileData {
  profileData {
    id
    firstName
    lastName
    middleName
    login
    email
  }
}
    `;

/**
 * __useProfileDataQuery__
 *
 * To run a query within a React component, call `useProfileDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfileDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfileDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useProfileDataQuery(baseOptions?: Apollo.QueryHookOptions<ProfileDataQuery, ProfileDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProfileDataQuery, ProfileDataQueryVariables>(ProfileDataDocument, options);
      }
export function useProfileDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProfileDataQuery, ProfileDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProfileDataQuery, ProfileDataQueryVariables>(ProfileDataDocument, options);
        }
export function useProfileDataSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProfileDataQuery, ProfileDataQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProfileDataQuery, ProfileDataQueryVariables>(ProfileDataDocument, options);
        }
export type ProfileDataQueryHookResult = ReturnType<typeof useProfileDataQuery>;
export type ProfileDataLazyQueryHookResult = ReturnType<typeof useProfileDataLazyQuery>;
export type ProfileDataSuspenseQueryHookResult = ReturnType<typeof useProfileDataSuspenseQuery>;
export type ProfileDataQueryResult = Apollo.QueryResult<ProfileDataQuery, ProfileDataQueryVariables>;