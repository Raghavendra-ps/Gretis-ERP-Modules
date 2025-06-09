from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in linkedin_integration/__init__.py
from linkedin_integration import __version__ as version

setup(
	name="linkedin_integration",
	version=version,
	description="Linkedin Integration",
	author="Gretis",
	author_email="info@gretisindia.com",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
