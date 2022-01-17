export function cls<T extends Record<string, string>>(
  styles: T,
  ...args: (keyof T | false | void)[]
) {
  return args.map((a) => (a !== false && a != null ? styles[a] : undefined)).join(' ')
}
