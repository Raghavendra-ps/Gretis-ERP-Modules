from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in docusign_alt/__init__.py
from docusign_alt import __version__ as version

setup(
	name="docusign_alt",
	version=version,
	description="Digital Signatures",
	author="Gretis",
	author_email="info@gretisindia.com",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
