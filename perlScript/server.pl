#!/usr/bin/perl
use strict;
use warnings;
use v5.010;
use IO::Socket;
use Data::Dumper;


my $server = IO::Socket::INET->new(
    Listen => 5,
    LocalAddr => 'localhost',
    LocalPort => 4444,
    Proto     => 'tcp'
) or die "Can't create server socket: $!";

say "Listening on port: 4444";
my $client = $server->accept;

while (<$client>) {
    say $_;
}
