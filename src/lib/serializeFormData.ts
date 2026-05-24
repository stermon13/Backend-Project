/**
 * Serialize a plain object into FormData using dotted paths for nested objects/arrays,
 * matching the expectations of `convertFormData`.
 */
export function serializeFormData(data: unknown): FormData {
  const formData = new FormData()
  appendValue(formData, '', data)
  return formData
}

function appendValue(formData: FormData, path: string, value: unknown): void {
  if (value === undefined || value === null) {
    return
  }

  if (value instanceof Date) {
    formData.append(path, value.toISOString())
    return
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      if (item !== null && typeof item === 'object' && !(item instanceof Date)) {
        appendValue(formData, path ? `${path}.${index}` : String(index), item)
      } else {
        const key = path
        if (item !== undefined && item !== null) {
          formData.append(key, item instanceof Date ? item.toISOString() : String(item))
        }
      }
    })

    return
  }

  if (typeof value === 'object') {
    Object.entries(value as Record<string, unknown>).forEach(([key, nestedValue]) => {
      const nextPath = path ? `${path}.${key}` : key
      appendValue(formData, nextPath, nestedValue)
    })

    return
  }

  formData.append(path, String(value))
}

