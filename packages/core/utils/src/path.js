// @flow strict-local
import type {FilePath} from '@parcel/types';
import path from 'path';

const ABSOLUTE_PATH_REGEX = /^([a-zA-Z]:){0,1}[\\/]+/;
const SEPARATOR_REGEX = /[\\]+/g;

export function isAbsolute(filepath: string): boolean {
  return ABSOLUTE_PATH_REGEX.test(filepath);
}

export function normalizeSeparators(filePath: FilePath): FilePath {
  return filePath.replace(SEPARATOR_REGEX, '/');
}

export type PathOptions = {
  noLeadingDotSlash?: boolean,
  ...
};

export function normalizePath(
  filePath: FilePath,
  leadingDotSlash: boolean = true,
): FilePath {
  if (
    leadingDotSlash &&
    (filePath[0] !== '.' ||
      (filePath[1] !== '.' && filePath[1] !== '/' && filePath[1] !== '\\')) &&
    filePath[0] !== '/'
  ) {
    return normalizeSeparators('./' + filePath);
  } else {
    return normalizeSeparators(filePath);
  }
}

export function relativePath(
  from: string,
  to: string,
  leadingDotSlash: boolean = true,
): FilePath {
  return normalizePath(path.relative(from, to), leadingDotSlash);
}

export opaque type ProjectPath = string;

export function toProjectPath_(
  projectRoot: FilePath,
  p: FilePath,
): ProjectPath {
  return relativePath(projectRoot, p);
}

export const toProjectPath: ((
  projectRoot: FilePath,
  p: FilePath,
) => ProjectPath) &
  // $FlowFixMe Not sure how to type properly
  ((projectRoot: FilePath, p: ?FilePath) => ?ProjectPath) = toProjectPath_;

export function fromProjectPath_(
  projectRoot: FilePath,
  p: ?ProjectPath,
): ?FilePath {
  return p != null ? path.join(projectRoot, p) : p;
}

export const fromProjectPath: ((
  projectRoot: FilePath,
  p: ProjectPath,
) => FilePath) &
  // $FlowFixMe Not sure how to type properly
  ((projectRoot: FilePath, p: ?ProjectPath) => ?FilePath) = fromProjectPath_;

export function fromProjectPathRelative(p: ProjectPath): FilePath {
  return p;
}

export function toProjectPathUnsafe(p: FilePath): ProjectPath {
  return p;
}

export function joinProjectPath(
  a: ProjectPath,
  ...b: Array<FilePath>
): ProjectPath {
  return path.join(a, ...b);
}
