from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in custom_bot/__init__.py
from custom_bot import __version__ as version

setup(
	name="custom_bot",
	version=version,
	description="AI Bot",
	author="Gretis India",
	author_email="info@gretisindia.com",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
