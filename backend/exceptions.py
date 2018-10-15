"""All available Exceptions for whole project."""


class ResourceManagerException(Exception):
	"""Base class for all HTTP Exceptions."""

	pass


class UnsupportedActionException(ResourceManagerException):
	"""Exception for unsupported Action."""

	pass


class InvalidResponseException(ResourceManagerException):
	"""Exception for invalid Response."""

	pass


class InternalErrorException(ResourceManagerException):
	"""Exception designed to use to indicate internal errors (like DB/Storage error)."""

	pass
